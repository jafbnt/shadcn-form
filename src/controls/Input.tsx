import { forwardRef } from "react";
import type React from "react";
import type { ControlSize, ControlVariant } from "./styles";
import { controlClassName } from "./styles";
import { PasswordInput } from "./PasswordInput";
import { Textarea } from "./Textarea";

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  size?: ControlSize;
  variant?: ControlVariant;
  invalid?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, size, variant, invalid, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={controlClassName(className, size, variant, invalid)}
      {...props}
    />
  );
});

type InputComponent = typeof Input & {
  Password: typeof PasswordInput;
  TextArea: typeof Textarea;
};

export const InputWithParts = Object.assign(Input, {
  Password: PasswordInput,
  TextArea: Textarea,
}) as InputComponent;
