import List from "rc-field-form/lib/List";
import type { FormListProps } from "./types";

const ListCompat = (List as unknown as { default?: typeof List }).default ?? List;

export function FormList(props: FormListProps) {
  return <ListCompat {...props}>{props.children}</ListCompat>;
}
