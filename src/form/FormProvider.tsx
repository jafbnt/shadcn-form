import { FormProvider as RcFormProvider } from "rc-field-form";
import type { FormProviderProps } from "./types";

export function FormProvider(props: FormProviderProps) {
  return <RcFormProvider {...props}>{props.children}</RcFormProvider>;
}
