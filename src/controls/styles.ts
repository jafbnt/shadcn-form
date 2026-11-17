import { cn } from "../utils/cn";

export type ControlSize = "small" | "middle" | "large";
export type ControlVariant = "outlined" | "filled" | "borderless" | "underlined";

export function controlClassName(
  className: string | undefined,
  size: ControlSize | undefined,
  variant: ControlVariant | undefined,
  invalid: boolean | undefined,
) {
  return cn(
    "w-full rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
    size === "small" && "h-8 px-2 text-xs",
    (!size || size === "middle") && "h-10 px-3",
    size === "large" && "h-11 px-4 text-base",
    (!variant || variant === "outlined") && "border border-input bg-background",
    variant === "filled" && "border border-transparent bg-muted",
    variant === "borderless" && "border border-transparent bg-transparent",
    variant === "underlined" && "rounded-none border-0 border-b border-input bg-transparent px-0",
    invalid && "border-destructive focus-visible:ring-destructive/30",
    className,
  );
}
