import { cloneElement, isValidElement, useMemo } from "react";
import type { ReactElement, ReactNode } from "react";
import Field from "rc-field-form/lib/Field";
import type { Rule } from "rc-field-form/lib/interface";
import { FormErrorList } from "./FormErrorList";
import { FormItemStatusContext } from "./contexts";
import type { FormItemProps, ValidateStatus } from "./types";
import { useFormConfig } from "./formConfigContext";
import { cn } from "../utils/cn";

const FieldCompat = (Field as unknown as { default?: typeof Field }).default ?? Field;

function defaultGetValueFromEvent(valuePropName: string, args: unknown[]): unknown {
  const event = args[0] as
    | { target?: { value?: unknown; checked?: unknown } }
    | undefined;

  if (valuePropName === "checked") {
    if (event?.target && "checked" in event.target) {
      return event.target.checked;
    }

    return args[0];
  }

  if (event?.target && "value" in event.target) {
    return event.target.value;
  }

  return args[0];
}

function toStatus(errors: string[], warnings: string[], validating: boolean): ValidateStatus | undefined {
  if (validating) {
    return "validating";
  }

  if (errors.length > 0) {
    return "error";
  }

  if (warnings.length > 0) {
    return "warning";
  }

  return undefined;
}

function namePathToId(name: FormItemProps["name"]): string | undefined {
  if (!name) {
    return undefined;
  }

  if (Array.isArray(name)) {
    return name.join("_");
  }

  return String(name);
}

function colToStyle(col?: { span?: number; offset?: number }) {
  if (!col) {
    return undefined;
  }

  const width = typeof col.span === "number" ? `${(col.span / 24) * 100}%` : undefined;
  const marginLeft = typeof col.offset === "number" ? `${(col.offset / 24) * 100}%` : undefined;

  if (!width && !marginLeft) {
    return undefined;
  }

  return { width, marginLeft };
}

export function FormItem({
  className,
  style,
  name,
  label,
  required,
  hidden,
  noStyle,
  initialValue,
  preserve,
  dependencies,
  rules,
  tooltip,
  htmlFor,
  labelAlign,
  labelCol,
  wrapperCol,
  validateTrigger,
  validateDebounce,
  validateFirst,
  shouldUpdate,
  valuePropName,
  trigger,
  normalize,
  getValueFromEvent,
  getValueProps,
  help,
  extra,
  validateStatus,
  messageVariables,
  children,
}: FormItemProps) {
  const fieldRules = useMemo(() => rules as Rule[] | undefined, [rules]);
  const cfg = useFormConfig();

  return (
    <FieldCompat
      name={name}
      initialValue={initialValue}
      preserve={preserve}
      dependencies={dependencies}
      rules={fieldRules}
      validateTrigger={validateTrigger}
      validateDebounce={validateDebounce}
      validateFirst={validateFirst}
      shouldUpdate={shouldUpdate}
      messageVariables={messageVariables}
    >
      {(control, meta, form) => {
        if (typeof children === "function") {
          if (children.length > 0) {
            return <>{children(form)}</>;
          }
          return <>{(children as () => ReactNode)()}</>;
        }

        const computedStatus = validateStatus ?? toStatus(meta.errors, meta.warnings, meta.validating);
        const localFieldId = namePathToId(name);
        const fieldId = [cfg.name, localFieldId].filter(Boolean).join("_") || undefined;
        const statusClasses =
          computedStatus === "error"
            ? "border-destructive"
            : computedStatus === "warning"
              ? "border-amber-500"
              : "";
        const isRequiredByRule = fieldRules?.some((rule) => {
          if (typeof rule === "function") {
            return false;
          }
          return Boolean(rule.required);
        });
        const requiredMarkEnabled = cfg.requiredMark !== false;
        const showRequiredAsterisk =
          requiredMarkEnabled && (required === true || (!!name && required !== false && isRequiredByRule));
        const showOptionalMark =
          requiredMarkEnabled && cfg.requiredMark === "optional" && !showRequiredAsterisk && !!name;
        const mergedLabelAlign = labelAlign ?? cfg.labelAlign;
        const labelStyle = colToStyle((labelCol ?? cfg.labelCol) ?? undefined);
        const controlStyle = colToStyle((wrapperCol ?? cfg.wrapperCol) ?? undefined);
        const isHorizontal = cfg.layout === "horizontal";
        const childDisabled = cfg.disabled === true;
        const childSize = cfg.size;
        const childVariant = cfg.variant;
        const currentPropsFromChild = isValidElement(children)
          ? (children.props as Record<string, unknown>)
          : {};
        const resolvedValuePropName =
          valuePropName ??
          (("checked" in currentPropsFromChild && !("value" in currentPropsFromChild))
            ? "checked"
            : "value");
        const resolvedTrigger =
          trigger ??
          (("onChange" in currentPropsFromChild
            ? "onChange"
            : "onCheckedChange" in currentPropsFromChild
              ? "onCheckedChange"
              : "onValueChange" in currentPropsFromChild
                ? "onValueChange"
                : "onChange") as string);

        const eventHandler = (...args: unknown[]) => {
          const prevValue = control.value;
          const nextFromEvent = getValueFromEvent
            ? getValueFromEvent(...args)
            : defaultGetValueFromEvent(resolvedValuePropName, args);
          const nextValue = normalize ? normalize(nextFromEvent, prevValue, form.getFieldsValue(true)) : nextFromEvent;

          control.onChange(nextValue);
        };

        const childNode =
          isValidElement(children) && control
            ? (() => {
                const child = children as ReactElement<Record<string, unknown>>;
                const currentProps = child.props as Record<string, unknown>;
                const isNativeElement = typeof child.type === "string";
                const nextProps: Record<string, unknown> = {
                  ...(getValueProps
                    ? getValueProps(control.value)
                    : { [resolvedValuePropName]: control.value }),
                  [resolvedTrigger]: (...args: unknown[]) => {
                    eventHandler(...args);
                    const original = currentProps[resolvedTrigger];
                    if (typeof original === "function") {
                      (original as (...inner: unknown[]) => void)(...args);
                    }
                  },
                  id: currentProps.id ?? fieldId,
                  "aria-invalid":
                    computedStatus === "error" ? true : (currentProps["aria-invalid"] as unknown),
                  disabled: currentProps.disabled ?? childDisabled ?? undefined,
                };

                if (!isNativeElement) {
                  nextProps.size = currentProps.size ?? childSize ?? undefined;
                  nextProps.variant = currentProps.variant ?? childVariant ?? undefined;
                  nextProps.invalid = currentProps.invalid ?? (computedStatus === "error");
                }

                return cloneElement(child, nextProps);
              })()
            : children;

        if (noStyle) {
          return childNode;
        }

        return (
          <FormItemStatusContext.Provider
            value={{ status: computedStatus, errors: meta.errors, warnings: meta.warnings }}
          >
            <div
              className={cn(
                "space-y-1",
                isHorizontal && "grid grid-cols-1 items-start gap-2 md:grid-cols-[minmax(120px,auto),1fr]",
                hidden && "hidden",
                className,
              )}
              style={style}
            >
              {label ? (
                <label
                  htmlFor={htmlFor === null ? undefined : htmlFor ?? fieldId}
                  className={cn(
                    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                    mergedLabelAlign === "start" && "text-left",
                    mergedLabelAlign === "end" && "text-right",
                    cfg.labelWrap ? "whitespace-normal break-words" : "whitespace-nowrap",
                  )}
                  style={isHorizontal ? labelStyle : undefined}
                  title={typeof tooltip === "string" ? tooltip : undefined}
                >
                  {label}
                  {cfg.colon !== false && isHorizontal ? ":" : null}
                  {showRequiredAsterisk ? <span className="ml-1 text-destructive">*</span> : null}
                  {showOptionalMark ? (
                    <span className="ml-1 text-xs text-muted-foreground">(opcional)</span>
                  ) : null}
                </label>
              ) : isHorizontal ? (
                <div style={labelStyle} />
              ) : null}

              <div style={isHorizontal ? controlStyle : undefined}>
                <div className={statusClasses}>{childNode}</div>
                {help ? <div className="text-sm text-muted-foreground">{help}</div> : null}
                <FormErrorList errors={meta.errors} warnings={meta.warnings} />
                {extra ? <div className="text-xs text-muted-foreground">{extra}</div> : null}
              </div>
            </div>
          </FormItemStatusContext.Provider>
        );
      }}
    </FieldCompat>
  );
}
