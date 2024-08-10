import LoginForm from "../../components/LoginForm/LoginForm";
import Nav from "../../components/Nav/Nav";

const Login = () => {
  return (
    <>
      <Nav className={styles.nav} />
      <main>
        <LoginForm />
      </main>
    </>
  );
};

export default Login;
