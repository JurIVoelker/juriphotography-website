"use client";
import Link from "next/link";
import { Button } from "react-aria-components";
import styles from "./Button.module.scss";
import { AriaSpinner } from "../AriaSpinner/AriaSpinner";
import { AriaButtonProps as ButtonProps } from "react-aria";

interface AriaButtonProps extends ButtonProps {
  href?: string;
  variant?: "solid" | "link";
  children?: any;
  type?: any;
  className?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const AriaButton = ({
  href,
  variant = "solid",
  children,
  type,
  className,
  isLoading,
  isDisabled,
  ...props
}: AriaButtonProps) => {
  const Component = href ? Link : Button;
  const variants = {
    solid: {
      className: styles.solid,
    },
    link: {
      className: styles.link,
    },
  };

  return (
    <Component
      href={href}
      className={`${styles.component} ${variants[variant].className} ${
        className || ""
      }`}
      type={type}
      isDisabled={isDisabled || isLoading}
      {...props}
    >
      {!isLoading && children}
      {isLoading && <AriaSpinner className={styles.spinner} />}
    </Component>
  );
};

export default AriaButton;