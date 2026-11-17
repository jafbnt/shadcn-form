import type React from "react";
import { useMemo } from "react";
import { cn } from "../utils/cn";
import { controlClassName } from "./styles";

export type CascaderOption = {
  label: React.ReactNode;
  value: string | number;
  disabled?: boolean;
  children?: CascaderOption[];
};

export type CascaderProps = {
  className?: string;
  options: CascaderOption[];
  value?: Array<string | number>;
  onChange?: (value: Array<string | number>, selectedOptions: CascaderOption[]) => void;
  disabled?: boolean;
  size?: "small" | "middle" | "large";
  variant?: "outlined" | "filled" | "borderless" | "underlined";
  invalid?: boolean;
  placeholder?: string;
};

export function Cascader({
  className,
  options,
  value = [],
  onChange,
  disabled,
  size,
  variant,
  invalid,
  placeholder = "Selecione",
}: CascaderProps) {
  const columns = useMemo(() => {
    const result: CascaderOption[][] = [];
    let levelOptions = options;
    let index = 0;

    while (levelOptions && levelOptions.length > 0) {
      result.push(levelOptions);
      const current = value[index];
      const selected = levelOptions.find((option) => option.value === current);
      levelOptions = selected?.children ?? [];
      index += 1;
    }

    return result;
  }, [options, value]);

  const getSelectedOptions = (nextValue: Array<string | number>) => {
    const selected: CascaderOption[] = [];
    let currentOptions = options;
    for (const part of nextValue) {
      const found = currentOptions.find((option) => option.value === part);
      if (!found) {
        break;
      }
      selected.push(found);
      currentOptions = found.children ?? [];
    }
    return selected;
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {columns.map((levelOptions, level) => (
        <select
          key={level}
          disabled={disabled}
          className={controlClassName(undefined, size, variant, invalid)}
          value={value[level] ?? ""}
          onChange={(event) => {
            const nextValue = [...value.slice(0, level), event.target.value];
            const selected = getSelectedOptions(nextValue);
            onChange?.(nextValue, selected);
          }}
        >
          <option value="">{placeholder}</option>
          {levelOptions.map((option) => (
            <option key={String(option.value)} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
}
