import { forwardRef } from "react";
import { CheckboxGroup } from "./CheckboxGroup";
import type React from "react";

export type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "type" | "onChange" | "value"
> & {
  checked?: boolean;
  value?: boolean;
  onChange?: (checked: boolean) => void;
  onCheckedChange?: (checked: boolean) => void;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { checked, value, onChange, onCheckedChange, children, ...props },
  ref,
) {
  const mergedChecked = typeof checked === "boolean" ? checked : Boolean(value);

  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <input
        ref={ref}
        type="checkbox"
        checked={mergedChecked}
        onChange={(event) => {
          const next = event.target.checked;
          onChange?.(next);
          onCheckedChange?.(next);
        }}
        {...props}
      />
      {children}
    </label>
  );
});

type CheckboxComponent = typeof Checkbox & {
  Group: typeof CheckboxGroup;
};

export const CheckboxWithGroup = Object.assign(Checkbox, {
  Group: CheckboxGroup,
}) as CheckboxComponent;
