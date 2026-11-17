import { forwardRef } from "react";
import type React from "react";
import type { ControlSize, ControlVariant } from "./styles";
import { controlClassName } from "./styles";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  size?: ControlSize;
  variant?: ControlVariant;
  invalid?: boolean;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, size, variant, invalid, rows = 4, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={controlClassName(className, size, variant, invalid)}
      {...props}
    />
  );
});
