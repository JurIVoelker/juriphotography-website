import Nav from "../components/Nav/Nav";
import styles from "./not-found.module.scss";

const NotFoundPage = () => {
  return (
    <>
      <Nav />
      <main className={styles.main}>
        <div className={styles.div}>
          <h1>404</h1>
          <p>Diese Seite konnte nicht gefunden werden</p>
        </div>
      </main>
    </>
  );
};

export default NotFoundPage;
