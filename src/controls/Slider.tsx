import type React from "react";
import { controlClassName } from "./styles";

export type SliderProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "defaultValue" | "onChange" | "size"
> & {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  size?: "small" | "middle" | "large";
  variant?: "outlined" | "filled" | "borderless" | "underlined";
  invalid?: boolean;
};

export function Slider({
  className,
  value,
  defaultValue,
  onChange,
  size,
  variant,
  invalid,
  ...props
}: SliderProps) {
  return (
    <input
      type="range"
      className={controlClassName(className, size, variant, invalid)}
      value={value}
      defaultValue={defaultValue}
      onChange={(event) => onChange?.(Number(event.target.value))}
      {...props}
    />
  );
}
