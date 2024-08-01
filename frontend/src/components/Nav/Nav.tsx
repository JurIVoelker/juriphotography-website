"use client";
import styles from "./Nav.module.scss";
import AriaButton from "../Button/Button";

interface NavProps {
  pages: { name: string; href: string }[];
  className?: string;
}

const Nav = ({ pages, className, ...props }: NavProps) => {
  return (
    <div
      className={`${styles.navContainer} ${className ? className : ""}`}
      {...props}
    >
      <div className={styles.nav}>
        {pages.map((p) => (
          <AriaButton href={p.href} key={p.href} variant="link">
            {p.name}
          </AriaButton>
        ))}
      </div>
    </div>
  );
};

export default Nav;
