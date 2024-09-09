import type { AriaToastProps } from "@react-aria/toast";
import { useToast } from "@react-aria/toast";
import { ToastState } from "@react-stately/toast";
import { useRef } from "react";
import styles from "./Toast.module.scss";
import AriaButton from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// Reuse the Button from your component library. See below for details.

interface ToastProps<T> extends AriaToastProps<T> {
  state: ToastState<T>;
}

export function Toast<T extends React.ReactNode>({
  state,
  ...props
}: ToastProps<T>) {
  let ref = useRef(null);
  let { toastProps, contentProps, titleProps, closeButtonProps } = useToast(
    props,
    state,
    ref
  );
  // @ts-ignore
  const { text, variant: _variant } = props.toast.content;
  const variants = {
    info: {
      title: "Information",
      className: styles.info,
    },
    error: {
      title: "Fehler",
      className: styles.error,
    },
  };
  const defaultVariant = "info";
  const variant = variants[_variant || defaultVariant];

  return (
    <div
      {...toastProps}
      ref={ref}
      className={`${styles.toast} ${variant.className}`}
    >
      <div {...contentProps}>
        <div {...titleProps} className={styles.title}>
          {variant.title}
          <AriaButton {...closeButtonProps} className={styles.button}>
            <FontAwesomeIcon icon={faXmark} />
          </AriaButton>
        </div>
        <div>{text}</div>
      </div>
    </div>
  );
}
