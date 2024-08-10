import { Suspense } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import Nav from "../../components/Nav/Nav";
import styles from "./Login.module.scss";

const Login = () => {
  return (
    <>
      <Nav />
      <main className={styles.content}>
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm className={styles.loginForm} />
        </Suspense>
      </main>
    </>
  );
};

export default Login;
