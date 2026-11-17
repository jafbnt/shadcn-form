import { forwardRef } from "react";
import type React from "react";
import type { ControlSize, ControlVariant } from "./styles";
import { controlClassName } from "./styles";
import { RangePicker } from "./RangePicker";

export type DatePickerProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  size?: ControlSize;
  variant?: ControlVariant;
  invalid?: boolean;
};

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(function DatePicker(
  { className, size, variant, invalid, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      type="date"
      className={controlClassName(className, size, variant, invalid)}
      {...props}
    />
  );
});

type DatePickerComponent = typeof DatePicker & {
  RangePicker: typeof RangePicker;
};

export const DatePickerWithParts = Object.assign(DatePicker, {
  RangePicker,
}) as DatePickerComponent;
