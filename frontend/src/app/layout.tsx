import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import styles from "./layout.module.scss";
import LoadingOverlay from "../components/LoadingOverlay/LoadingOverlay";
import { GlobalToastRegion } from "../components/Toast/GlobalToastRegion";
const font = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${font.className} ${styles.wrapper}`}>
        <LoadingOverlay />
        <GlobalToastRegion />
        <div className={styles.container}>{children}</div>
      </body>
    </html>
  );
}
