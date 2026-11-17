import type React from "react";
import { controlClassName } from "./styles";

export type MentionOption = {
  value: string;
  label?: string;
};

export type MentionsProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "value" | "defaultValue" | "onChange"
> & {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options?: MentionOption[];
  size?: "small" | "middle" | "large";
  variant?: "outlined" | "filled" | "borderless" | "underlined";
  invalid?: boolean;
};

export function Mentions({
  className,
  value,
  defaultValue,
  onChange,
  rows = 4,
  size,
  variant,
  invalid,
  ...props
}: MentionsProps) {
  return (
    <textarea
      className={controlClassName(className, size, variant, invalid)}
      rows={rows}
      value={value}
      defaultValue={defaultValue}
      onChange={(event) => onChange?.(event.target.value)}
      {...props}
    />
  );
}
