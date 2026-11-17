import { forwardRef, useState } from "react";
import type React from "react";
import type { ControlSize, ControlVariant } from "./styles";
import { controlClassName } from "./styles";

export type PasswordInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  size?: ControlSize;
  variant?: ControlVariant;
  invalid?: boolean;
};

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(function PasswordInput(
  { className, size, variant, invalid, ...props },
  ref,
) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        ref={ref}
        type={visible ? "text" : "password"}
        className={controlClassName(className, size, variant, invalid)}
        {...props}
      />
      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
      >
        {visible ? "ocultar" : "mostrar"}
      </button>
    </div>
  );
});
