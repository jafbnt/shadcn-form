import List from "rc-field-form/lib/List";
import type { FormListProps } from "./types";

export function FormList(props: FormListProps) {
  return <List {...props}>{props.children}</List>;
}
