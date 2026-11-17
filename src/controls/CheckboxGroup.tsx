import { cn } from "../utils/cn";
import type React from "react";

export type CheckboxGroupOption = {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
};

export type CheckboxGroupProps = {
  className?: string;
  options: CheckboxGroupOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  disabled?: boolean;
};

export function CheckboxGroup({
  className,
  options,
  value,
  defaultValue = [],
  onChange,
  disabled,
}: CheckboxGroupProps) {
  const selected = value ?? defaultValue;

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {options.map((option) => {
        const checked = selected.includes(option.value);
        return (
          <label key={option.value} className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={checked}
              disabled={disabled || option.disabled}
              onChange={(event) => {
                const nextSet = new Set(selected);
                if (event.target.checked) {
                  nextSet.add(option.value);
                } else {
                  nextSet.delete(option.value);
                }
                onChange?.([...nextSet]);
              }}
            />
            {option.label}
          </label>
        );
      })}
    </div>
  );
}
