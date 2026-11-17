import { cn } from "../utils/cn";

export type RateProps = {
  className?: string;
  count?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
};

export function Rate({
  className,
  count = 5,
  value,
  defaultValue = 0,
  onChange,
  disabled,
}: RateProps) {
  const current = value ?? defaultValue;

  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      {Array.from({ length: count }, (_, index) => {
        const star = index + 1;
        const active = star <= current;
        return (
          <button
            key={star}
            type="button"
            disabled={disabled}
            className={cn(
              "text-xl leading-none transition-colors",
              active ? "text-amber-500" : "text-muted-foreground",
              disabled && "cursor-not-allowed opacity-50",
            )}
            onClick={() => onChange?.(star)}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}
