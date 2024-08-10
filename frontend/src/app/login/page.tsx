import { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import Nav from "../../components/Nav/Nav";
import styles from "./Login.module.scss";

const Login = () => {
  return (
    <>
      <Nav />
      <main className={styles.content}>
        <LoginForm className={styles.loginForm} />
      </main>
    </>
  );
};

export default Login;
