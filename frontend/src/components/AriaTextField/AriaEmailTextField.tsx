import { AriaTextField, AriaTextFieldProps } from "./AriaTextField";
import { emailRegex } from "../../constants/regexs";
import { useState } from "react";
import { INVALID_EMAIL_ERROR_MESSAGE } from "../../constants/constants";

export function AriaEmailTextField({
  value,
  errorMessage,
  ...props
}: AriaTextFieldProps) {
  let error = "";
  if (value && !emailRegex.test(value)) {
    error = INVALID_EMAIL_ERROR_MESSAGE;
  }
  return (
    <AriaTextField
      {...props}
      value={value}
      errorMessage={errorMessage || error}
    />
  );
}
