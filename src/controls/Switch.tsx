import { forwardRef } from "react";
import type React from "react";
import { cn } from "../utils/cn";

export type SwitchProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "value"> & {
  checked?: boolean;
  value?: boolean;
  onChange?: (checked: boolean) => void;
  onCheckedChange?: (checked: boolean) => void;
};

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { checked, value, onChange, onCheckedChange, className, disabled, ...props },
  ref,
) {
  const active = typeof checked === "boolean" ? checked : Boolean(value);

  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={active}
      disabled={disabled}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
        active ? "bg-primary" : "bg-muted",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      onClick={() => {
        const next = !active;
        onChange?.(next);
        onCheckedChange?.(next);
      }}
      {...props}
    >
      <span
        className={cn(
          "inline-block h-5 w-5 transform rounded-full bg-background transition-transform",
          active ? "translate-x-5" : "translate-x-1",
        )}
      />
    </button>
  );
});
