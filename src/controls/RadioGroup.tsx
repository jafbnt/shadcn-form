import { cn } from "../utils/cn";
import type React from "react";

export type RadioOption = {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
};

export type RadioGroupProps = {
  className?: string;
  name?: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
};

export type RadioButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange"
> & {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

export function RadioGroup({
  className,
  name,
  options,
  value,
  defaultValue,
  onChange,
  disabled,
}: RadioGroupProps) {
  const selected = value ?? defaultValue;

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {options.map((option) => (
        <label key={option.value} className="inline-flex items-center gap-2 text-sm">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selected === option.value}
            disabled={disabled || option.disabled}
            onChange={() => onChange?.(option.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}

export function RadioButton({ checked, onChange, className, children, ...props }: RadioButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      className={cn(
        "rounded-md border px-3 py-1.5 text-sm transition-colors",
        checked ? "border-primary bg-primary text-primary-foreground" : "border-input bg-background",
        className,
      )}
      onClick={() => onChange?.(!checked)}
      {...props}
    >
      {children}
    </button>
  );
}

export const Radio = {
  Group: RadioGroup,
  Button: RadioButton,
};
