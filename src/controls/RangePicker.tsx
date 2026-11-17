import { cn } from "../utils/cn";
import type { ControlSize, ControlVariant } from "./styles";
import { controlClassName } from "./styles";

export type RangeValue = [string | undefined, string | undefined];

export type RangePickerProps = {
  className?: string;
  size?: ControlSize;
  variant?: ControlVariant;
  invalid?: boolean;
  value?: RangeValue;
  onChange?: (value: RangeValue) => void;
  disabled?: boolean;
};

export function RangePicker({
  className,
  size,
  variant,
  invalid,
  value,
  onChange,
  disabled,
}: RangePickerProps) {
  const [start, end] = value ?? [undefined, undefined];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <input
        type="date"
        value={start ?? ""}
        disabled={disabled}
        className={controlClassName(undefined, size, variant, invalid)}
        onChange={(event) => onChange?.([event.target.value || undefined, end])}
      />
      <span className="text-muted-foreground">-</span>
      <input
        type="date"
        value={end ?? ""}
        disabled={disabled}
        className={controlClassName(undefined, size, variant, invalid)}
        onChange={(event) => onChange?.([start, event.target.value || undefined])}
      />
    </div>
  );
}
