"use client";
import { createPortal } from "react-dom";
import { ToastRegion } from "./ToastRegion";
import { ToastQueue, useToastQueue } from "@react-stately/toast";

export const toastQueue = new ToastQueue({
  maxVisibleToasts: 5,
});

export function GlobalToastRegion(props) {
  // Subscribe to it.
  let state = useToastQueue(toastQueue);

  // Render toast region.
  return state.visibleToasts.length > 0
    ? createPortal(<ToastRegion {...props} state={state} />, document.body)
    : null;
}
