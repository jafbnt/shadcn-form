import { createContext, useContext } from "react";
import type { ColLike, FormLayout, FormSize, FormVariant, LabelAlign, RequiredMark } from "./types";

export type FormConfig = {
  layout: FormLayout;
  size?: FormSize;
  disabled?: boolean;
  requiredMark?: RequiredMark;
  variant?: FormVariant;
  colon?: boolean;
  labelAlign?: LabelAlign;
  labelWrap?: boolean;
  labelCol?: ColLike;
  wrapperCol?: ColLike;
  name?: string;
};

export const FormConfigContext = createContext<FormConfig>({
  layout: "vertical",
  requiredMark: true,
  colon: true,
  labelAlign: "end",
  labelWrap: false,
});

export function useFormConfig() {
  return useContext(FormConfigContext);
}
