import { useContext } from "react";
import { FormItemStatusContext } from "./contexts";

export function useItemStatus() {
  return useContext(FormItemStatusContext);
}
