import type { Metadata } from "next";
import { Inter } from "next/font/google";
import styles from "./layout.module.scss";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className} ${styles.wrapper}`}>
        <div className={styles.container}>{children}</div>
      </body>
    </html>
  );
}
