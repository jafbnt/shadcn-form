import { forwardRef } from "react";
import type React from "react";
import type { ControlSize, ControlVariant } from "./styles";
import { controlClassName } from "./styles";

export type InputNumberProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange" | "value" | "defaultValue"
> & {
  size?: ControlSize;
  variant?: ControlVariant;
  invalid?: boolean;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number | undefined) => void;
};

export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumber(
  { className, size, variant, invalid, value, defaultValue, onChange, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      type="number"
      value={value ?? ""}
      defaultValue={defaultValue}
      onChange={(event) => {
        const raw = event.target.value;
        onChange?.(raw === "" ? undefined : Number(raw));
      }}
      className={controlClassName(className, size, variant, invalid)}
      {...props}
    />
  );
});
