import type React from "react";
import { useMemo } from "react";
import { controlClassName } from "./styles";

export type TreeSelectOption = {
  title: React.ReactNode;
  value: string | number;
  key?: string;
  disabled?: boolean;
  children?: TreeSelectOption[];
};

export type TreeSelectProps = {
  className?: string;
  treeData: TreeSelectOption[];
  value?: string | number | Array<string | number>;
  onChange?: (value: string | number | Array<string | number>) => void;
  multiple?: boolean;
  disabled?: boolean;
  size?: "small" | "middle" | "large";
  variant?: "outlined" | "filled" | "borderless" | "underlined";
  invalid?: boolean;
};

type FlatOption = {
  value: string | number;
  label: React.ReactNode;
  disabled?: boolean;
};

function flattenTree(options: TreeSelectOption[], level = 0): FlatOption[] {
  const result: FlatOption[] = [];

  for (const option of options) {
    result.push({
      value: option.value,
      label: `${" ".repeat(level * 2)}${String(option.title)}`,
      disabled: option.disabled,
    });

    if (option.children?.length) {
      result.push(...flattenTree(option.children, level + 1));
    }
  }

  return result;
}

export function TreeSelect({
  className,
  treeData,
  value,
  onChange,
  multiple,
  disabled,
  size,
  variant,
  invalid,
}: TreeSelectProps) {
  const options = useMemo(() => flattenTree(treeData), [treeData]);

  return (
    <select
      className={controlClassName(className, size, variant, invalid)}
      multiple={multiple}
      disabled={disabled}
      value={value as string | number | readonly string[] | undefined}
      onChange={(event) => {
        if (multiple) {
          const selected = Array.from(event.target.selectedOptions).map((opt) => opt.value);
          onChange?.(selected);
          return;
        }

        onChange?.(event.target.value);
      }}
    >
      {options.map((option) => (
        <option key={String(option.value)} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
