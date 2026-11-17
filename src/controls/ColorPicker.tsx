import type React from "react";
import { controlClassName } from "./styles";

export type ColorPickerProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "defaultValue" | "onChange" | "size"
> & {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: "small" | "middle" | "large";
  variant?: "outlined" | "filled" | "borderless" | "underlined";
  invalid?: boolean;
};

export function ColorPicker({
  className,
  value,
  defaultValue,
  onChange,
  size,
  variant,
  invalid,
  ...props
}: ColorPickerProps) {
  return (
    <input
      type="color"
      className={controlClassName(className, size, variant, invalid)}
      value={value}
      defaultValue={defaultValue}
      onChange={(event) => onChange?.(event.target.value)}
      {...props}
    />
  );
}
