import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./AlertBox.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";

interface AlertBoxProps {
  variant?: "info";
  children: ReactNode;
}

const AlertBox = ({ variant: _variant, children }: AlertBoxProps) => {
  const variants = {
    info: {
      className: styles.info,
      icon: faInfoCircle,
      title: "Hinweis",
    },
  };

  const variant = _variant ? variants[_variant] : variants.info;

  return (
    <div className={`${styles.alertBox} ${variant.className}`}>
      <div className={styles.heading}>
        <FontAwesomeIcon icon={variant.icon} />
        <h4>{variant.title}</h4>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default AlertBox;
