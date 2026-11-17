import { forwardRef } from "react";
import type { ReactElement, Ref } from "react";
import RcForm, { useForm, useWatch } from "rc-field-form";
import type { FormInstance } from "rc-field-form";
import type { FormRef } from "rc-field-form/lib/interface";
import { FormErrorList } from "./FormErrorList";
import { FormItem } from "./FormItem";
import { FormList } from "./FormList";
import { FormProvider } from "./FormProvider";
import { FormInstanceContext, useFormInstanceContext } from "./contexts";
import type { FormProps } from "./types";
import { FormConfigContext } from "./formConfigContext";
import { useItemStatus } from "./useItemStatus";
import { cn } from "../utils/cn";

function namePathToDomId(formName: string | undefined, path: Array<string | number>): string {
  return [formName, ...path].filter(Boolean).join("_");
}

const BaseForm = forwardRef<FormRef, FormProps>((props, ref) => {
  const {
    className,
    style,
    layout = "vertical",
    form,
    children,
    disabled,
    requiredMark,
    size,
    variant = "outlined",
    colon = true,
    labelAlign = "end",
    labelWrap = false,
    labelCol,
    wrapperCol,
    name,
    scrollToFirstError,
    onFinishFailed,
    ...rest
  } = props;

  const [innerForm] = useForm();
  const mergedForm = form ?? innerForm;
  const cfg = {
    layout,
    size,
    disabled,
    requiredMark,
    variant,
    colon,
    labelAlign,
    labelWrap,
    labelCol,
    wrapperCol,
    name,
  } as const;

  const handleFinishFailed: FormProps["onFinishFailed"] = (errorInfo) => {
    if (scrollToFirstError && errorInfo.errorFields.length > 0) {
      const firstField = errorInfo.errorFields[0];
      const domId = namePathToDomId(name, firstField.name);
      const fieldNode = document.getElementById(domId);

      if (fieldNode) {
        const options =
          typeof scrollToFirstError === "object"
            ? {
                behavior: scrollToFirstError.behavior ?? "smooth",
                block: scrollToFirstError.block ?? "center",
              }
            : { behavior: "smooth" as const, block: "center" as const };

        fieldNode.scrollIntoView(options);

        const shouldFocus =
          typeof scrollToFirstError === "object" ? scrollToFirstError.focus === true : false;
        if (shouldFocus && "focus" in fieldNode && typeof fieldNode.focus === "function") {
          fieldNode.focus();
        }
      }
    }

    onFinishFailed?.(errorInfo);
  };

  const isRenderChildren = typeof children === "function";

  return (
    <FormConfigContext.Provider value={cfg}>
      <FormInstanceContext.Provider value={mergedForm}>
        <RcForm
          {...rest}
          ref={ref}
          form={mergedForm}
          onFinishFailed={handleFinishFailed}
          className={cn(
            layout === "inline" && "flex flex-wrap items-start gap-3",
            layout === "horizontal" && "space-y-4",
            layout === "vertical" && "space-y-4",
            size === "small" && "text-sm",
            size === "large" && "text-base",
            className,
          )}
          style={style}
          data-form-name={name}
          data-disabled={disabled ? "true" : "false"}
          data-required-mark={String(requiredMark)}
          data-variant={variant}
        >
          {isRenderChildren ? children : <>{children}</>}
        </RcForm>
      </FormInstanceContext.Provider>
    </FormConfigContext.Provider>
  );
});

BaseForm.displayName = "Form";

type FormComponent = typeof BaseForm & {
  Item: typeof FormItem & { useStatus: typeof useItemStatus };
  List: typeof FormList;
  ErrorList: typeof FormErrorList;
  Provider: typeof FormProvider;
  useForm: typeof useForm;
  useWatch: typeof useWatch;
  useFormInstance: <Values extends object = Record<string, unknown>>() => FormInstance<Values>;
};

const ItemWithStatus = Object.assign(FormItem, {
  useStatus: useItemStatus,
});

export const Form = Object.assign(BaseForm, {
  Item: ItemWithStatus,
  List: FormList,
  ErrorList: FormErrorList,
  Provider: FormProvider,
  useForm,
  useWatch,
  useFormInstance: useFormInstanceContext,
}) as FormComponent &
  (<Values extends object = Record<string, unknown>>(
    props: FormProps<Values> & { ref?: Ref<FormRef<Values>> },
  ) => ReactElement);
