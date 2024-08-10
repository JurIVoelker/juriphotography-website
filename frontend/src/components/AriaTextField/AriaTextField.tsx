import type { TextFieldProps, ValidationResult } from "react-aria-components";
import {
  FieldError,
  Input,
  Label,
  Text,
  TextField,
} from "react-aria-components";

interface AriaTextFieldProps extends TextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  className?: string;
}

import styles from "./AriaTextField.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

export function AriaTextField({
  label,
  description,
  errorMessage,
  className,
  ...props
}: AriaTextFieldProps) {
  return (
    <TextField
      {...props}
      className={`${styles.textField} ${className || ""}`}
      isInvalid={!!errorMessage}
    >
      <Label className={styles.label}>{label}</Label>
      <Input className={styles.input} />
      {description && <Text slot="description">{description}</Text>}

      <FieldError className={styles.fieldError}>
        <>
          <FontAwesomeIcon icon={faExclamationCircle} className={styles.icon} />
          {errorMessage}
        </>
      </FieldError>
    </TextField>
  );
}
