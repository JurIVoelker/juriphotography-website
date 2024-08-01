"use client";
import Link from "next/link";
import { Button } from "react-aria-components";
import styles from "./Button.module.scss";

interface AriaButtonProps {
  href?: string;
  variant?: "solid" | "link";
  children?: any;
}

const AriaButton = ({
  href,
  variant = "solid",
  children,
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
      className={`${styles.component} ${variants[variant].className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default AriaButton;
