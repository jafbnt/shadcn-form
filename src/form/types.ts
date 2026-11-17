import type React from "react";
import type {
  FieldData,
  FormInstance,
  NamePath,
  Rule,
  ValidateErrorEntity,
  ValidateMessages,
  ValidateOptions,
  ValidatorRule,
} from "rc-field-form/lib/interface";
import type { FormRef } from "rc-field-form/lib/interface";

export type FormLayout = "horizontal" | "vertical" | "inline";
export type FormSize = "small" | "middle" | "large";
export type RequiredMark = boolean | "optional";
export type ValidateStatus = "success" | "warning" | "error" | "validating";
export type LabelAlign = "start" | "end";
export type FormVariant = "outlined" | "filled" | "borderless" | "underlined";

export type ColLike = {
  span?: number;
  offset?: number;
  xs?: { span?: number; offset?: number };
  sm?: { span?: number; offset?: number };
  md?: { span?: number; offset?: number };
  lg?: { span?: number; offset?: number };
  xl?: { span?: number; offset?: number };
};

export type ScrollToFirstErrorConfig = {
  focus?: boolean;
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
};

export type FormProps<Values extends object = Record<string, unknown>> = {
  className?: string;
  style?: React.CSSProperties;
  name?: string;
  layout?: FormLayout;
  size?: FormSize;
  disabled?: boolean;
  requiredMark?: RequiredMark;
  variant?: FormVariant;
  colon?: boolean;
  labelAlign?: LabelAlign;
  labelWrap?: boolean;
  labelCol?: ColLike;
  wrapperCol?: ColLike;
  initialValues?: Partial<Values>;
  fields?: FieldData[];
  form?: FormInstance<Values>;
  component?: false | string | React.FC<unknown> | React.ComponentClass<unknown>;
  preserve?: boolean;
  validateMessages?: ValidateMessages;
  validateTrigger?: string | string[] | false;
  scrollToFirstError?: boolean | ScrollToFirstErrorConfig;
  clearOnDestroy?: boolean;
  children?: React.ReactNode;
  onValuesChange?: (changedValues: Partial<Values>, allValues: Values) => void;
  onFieldsChange?: (changedFields: FieldData[], allFields: FieldData[]) => void;
  onFinish?: (values: Values) => void;
  onFinishFailed?: (errorInfo: ValidateErrorEntity<Values>) => void;
} & Omit<React.FormHTMLAttributes<HTMLFormElement>, "onFinish" | "onSubmit" | "size">;

export type FormItemProps = {
  className?: string;
  style?: React.CSSProperties;
  name?: NamePath;
  label?: React.ReactNode;
  required?: boolean;
  hidden?: boolean;
  noStyle?: boolean;
  initialValue?: unknown;
  preserve?: boolean;
  dependencies?: NamePath[];
  rules?: Rule[];
  tooltip?: React.ReactNode;
  htmlFor?: string | null;
  labelAlign?: LabelAlign;
  labelCol?: ColLike;
  wrapperCol?: ColLike;
  validateTrigger?: string | string[] | false;
  validateDebounce?: number;
  validateFirst?: boolean | "parallel";
  shouldUpdate?: boolean | ((prevValues: unknown, nextValues: unknown) => boolean);
  valuePropName?: string;
  trigger?: string;
  normalize?: (value: unknown, prevValue: unknown, allValues: unknown) => unknown;
  getValueFromEvent?: (...args: unknown[]) => unknown;
  getValueProps?: (value: unknown) => Record<string, unknown>;
  help?: React.ReactNode;
  extra?: React.ReactNode;
  validateStatus?: ValidateStatus;
  messageVariables?: Record<string, string>;
  children?: React.ReactNode | ((form: FormInstance) => React.ReactNode);
};

export type FormListProps = {
  name: NamePath;
  initialValue?: unknown[];
  rules?: ValidatorRule[];
  validateTrigger?: string | string[] | false;
  children: (
    fields: Array<{ name: number; key: number; isListField: boolean }>,
    operation: { add: (defaultValue?: unknown, insertIndex?: number) => void; remove: (index: number | number[]) => void; move: (from: number, to: number) => void },
    meta: { errors: React.ReactNode[]; warnings: React.ReactNode[] },
  ) => React.ReactNode;
};

export type FormProviderProps = {
  children: React.ReactNode;
  onFormChange?: (
    name: string,
    info: { changedFields: FieldData[]; forms: Record<string, FormInstance> },
  ) => void;
  onFormFinish?: (
    name: string,
    info: { values: unknown; forms: Record<string, FormInstance> },
  ) => void;
};

export type ValidateConfig = ValidateOptions;
export type FormInstanceRef<Values extends object = Record<string, unknown>> = FormRef<Values>;
