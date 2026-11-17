import { createContext, useContext } from "react";
import type { FormInstance } from "rc-field-form";

export type ItemStatus = {
  status: "success" | "warning" | "error" | "validating" | undefined;
  errors: string[];
  warnings: string[];
};

export const FormInstanceContext = createContext<FormInstance | null>(null);

export function useFormInstanceContext(): FormInstance {
  const form = useContext(FormInstanceContext);

  if (!form) {
    throw new Error("Form.useFormInstance deve ser usado dentro de um <Form />.");
  }

  return form;
}

export const FormItemStatusContext = createContext<ItemStatus>({
  status: undefined,
  errors: [],
  warnings: [],
});
