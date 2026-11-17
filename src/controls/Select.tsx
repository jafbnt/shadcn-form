import { forwardRef } from "react";
import type React from "react";
import type { ControlSize, ControlVariant } from "./styles";
import { controlClassName } from "./styles";

export type SelectOption = {
  label: React.ReactNode;
  value: string | number;
  disabled?: boolean;
};

export type SelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> & {
  size?: ControlSize;
  variant?: ControlVariant;
  invalid?: boolean;
  options?: SelectOption[];
  mode?: "multiple" | "tags";
  onChange?: (
    value: string | string[],
    option?: SelectOption | SelectOption[] | undefined,
  ) => void;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, size, variant, invalid, options, children, mode, onChange, ...props },
  ref,
) {
  const isMultiple = mode === "multiple" || mode === "tags";

  return (
    <select
      ref={ref}
      className={controlClassName(className, size, variant, invalid)}
      multiple={isMultiple}
      onChange={(event) => {
        if (isMultiple) {
          const values = Array.from(event.target.selectedOptions).map((opt) => opt.value);
          const selectedOptions = (options ?? []).filter((option) =>
            values.includes(String(option.value)),
          );
          onChange?.(values, selectedOptions);
          return;
        }

        const value = event.target.value;
        const selectedOption = (options ?? []).find(
          (option) => String(option.value) === value,
        );
        onChange?.(value, selectedOption);
      }}
      {...props}
    >
      {options?.map((option) => (
        <option key={String(option.value)} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>
      ))}
      {children}
    </select>
  );
});
