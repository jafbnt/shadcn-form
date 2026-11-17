import { forwardRef } from "react";
import type React from "react";
import type { ControlSize, ControlVariant } from "./styles";
import { controlClassName } from "./styles";

export type TimePickerProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  size?: ControlSize;
  variant?: ControlVariant;
  invalid?: boolean;
};

export const TimePicker = forwardRef<HTMLInputElement, TimePickerProps>(function TimePicker(
  { className, size, variant, invalid, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      type="time"
      className={controlClassName(className, size, variant, invalid)}
      {...props}
    />
  );
});
