import CreateEditAlbum from "../../components/CreateEditAlbum/CreateEditAlbum";
import Nav from "../../components/Nav/Nav";
import styles from "./dashboard.module.scss";

const Dashboard = () => {
  return (
    <>
      <Nav />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1>Neues Album</h1>
          <CreateEditAlbum />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
