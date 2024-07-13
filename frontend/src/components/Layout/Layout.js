import { Inter } from "next/font/google";
import styles from "./Layout.module.scss";
// import NavBar from "../Navbar/NavBar";
// import Footer from "../Footer/Footer";

const inter = Inter({ subsets: ["latin"] });
export default function Layout({ children }) {
  return (
    <div className={`${inter.className} ${styles.wrapper}`}>
      {/* <NavBar /> */}
      <main className={styles.container}>
        <div className={styles.contentWrapper}>{children}</div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
