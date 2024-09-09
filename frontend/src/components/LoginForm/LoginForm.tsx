"use client";
import { useEffect, useState } from "react";
import AlertBox from "../AlertBox/AlertBox";
import { AriaEmailTextField } from "../AriaTextField/AriaEmailTextField";
import { AriaTextField } from "../AriaTextField/AriaTextField";
import AriaButton from "../Button/Button";
import styles from "./LoginForm.module.scss";
import { Form } from "react-aria-components";
import { FIELD_REQUIRED_ERROR_MESSAGE } from "../../constants/constants";
import axios from "axios";
import { getApiUrl } from "../../utils/strapiUtils";
import {
  INVALID_PASSWORD_OR_IDENTIFIER,
  TOO_MANY_REQUESTS,
  UNDEFINED_ERROR,
} from "../../constants/errorMessages";
import { validateJwt } from "../../utils/authUtils";
import { useSearchParams, useRouter } from "next/navigation";
import { setCookie } from "../../utils/cookieUtils";

interface LoginFormProps {
  className?: string;
}

const LoginForm = ({ className, ...props }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [requiredError, setRequiredError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);

  const searchParams = useSearchParams();
  const { push } = useRouter();

  const handleLogout = () => {
    // Set the JWT cookie to expire in the past to delete it
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Reload the page
    window.location.reload();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(getApiUrl("/auth/local"), {
        identifier: email,
        password,
      })
      .then((res) => {
        setLoading(false);
        setErrorMessage("");
        const { jwt } = res.data;
        setCookie("jwt", jwt);
        const redirectUrl =
          decodeURIComponent(searchParams.get("redirect")) || "/login";
        if (redirectUrl !== "null" && redirectUrl) {
          push(redirectUrl);
        } else {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        const errorMessage = error?.response?.data?.error?.message;
        if (!errorMessage) {
          setErrorMessage(UNDEFINED_ERROR);
          return;
        }
        const errorMap = {
          "Invalid identifier or password": INVALID_PASSWORD_OR_IDENTIFIER,
          "Too many requests, please try again later.": TOO_MANY_REQUESTS,
        };
        setErrorMessage(errorMap[errorMessage]);
      });
  };

  useEffect(() => {
    async function isJwtValid() {
      const isValid = await validateJwt();
      setLoggedIn(isValid);
    }
    isJwtValid();
  }, []);

  const handleFormInvalid = () => {
    setRequiredError(true);
  };

  return (
    <div className={`${styles.wrapper} ${className || ""}`} {...props}>
      <h2>Login</h2>

      {!isLoggedIn && (
        <>
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
              errorMessage={
                !email && requiredError && FIELD_REQUIRED_ERROR_MESSAGE
              }
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
            {errorMessage && (
              <span className={styles.errorMessage}>{errorMessage}</span>
            )}
            <AriaButton
              type="submit"
              className={styles.loginButton}
              isLoading={isLoading}
            >
              Login
            </AriaButton>
          </Form>
        </>
      )}
      {isLoggedIn && (
        <div className={styles.loggedInMessage}>
          <p>Du bist bereits Eingeloggt. Möchtest du dich ausloggen?</p>
          <AriaButton className={styles.loginButton} onPress={handleLogout}>
            Ausloggen
          </AriaButton>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
