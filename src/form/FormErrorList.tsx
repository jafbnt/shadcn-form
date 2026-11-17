import type React from "react";
import { cn } from "../utils/cn";

type FormErrorListProps = {
  errors?: React.ReactNode[];
  warnings?: React.ReactNode[];
  className?: string;
};

export function FormErrorList({ errors = [], warnings = [], className }: FormErrorListProps) {
  if (errors.length === 0 && warnings.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-1 text-sm", className)}>
      {errors.map((error, index) => (
        <div key={`error-${index}`} className="text-destructive">
          {error}
        </div>
      ))}
      {warnings.map((warning, index) => (
        <div key={`warning-${index}`} className="text-amber-600">
          {warning}
        </div>
      ))}
    </div>
  );
}
