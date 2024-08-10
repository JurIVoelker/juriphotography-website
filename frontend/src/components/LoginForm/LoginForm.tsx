"use client";
import { useState } from "react";
import AlertBox from "../AlertBox/AlertBox";
import { AriaEmailTextField } from "../AriaTextField/AriaEmailTextField";
import { AriaTextField } from "../AriaTextField/AriaTextField";
import AriaButton from "../Button/Button";
import styles from "./LoginForm.module.scss";

import { Form } from "react-aria-components";
import { FIELD_REQUIRED_ERROR_MESSAGE } from "../../constants/constants";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [requiredError, setRequiredError] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };
  const handleFormInvalid = () => {
    setRequiredError(true);
  };

  return (
    <div className={styles.wrapper}>
      <h2>Login</h2>
      <AlertBox>
        Der Login ist nur für Betreiber dieser Webseite gedacht.
      </AlertBox>
      <Form
        className={styles.form}
        onInvalid={handleFormInvalid}
        onSubmit={handleFormSubmit}
      >
        <AriaEmailTextField
          label="E-Mail-Adresse"
          isRequired
          value={email}
          onChange={setEmail}
          errorMessage={!email && requiredError && FIELD_REQUIRED_ERROR_MESSAGE}
        />
        <AriaTextField
          value={password}
          onChange={setPassword}
          label="Passwort"
          isRequired
          errorMessage={
            !password && requiredError && FIELD_REQUIRED_ERROR_MESSAGE
          }
          type="password"
        />
        <AriaButton type="submit" className={styles.loginButton}>
          Login
        </AriaButton>
      </Form>
    </div>
  );
};

export default LoginForm;
