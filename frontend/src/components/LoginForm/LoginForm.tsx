"use client";
import AlertBox from "../AlertBox/AlertBox";
import styles from "./LoginForm.module.scss";

import { Form } from "react-aria-components";

const LoginForm = () => {
  return (
    <Form className={styles.loginForm}>
      <h2>Login</h2>
      <AlertBox>test</AlertBox>
    </Form>
  );
};

export default LoginForm;
