"use client";
import styles from "./Nav.module.scss";
import AriaButton from "../Button/Button";
import { useEffect, useState } from "react";
import { getCookie } from "../../utils/cookieUtils";

interface NavProps {
  pages?: {
    name: string;
    href: string;
    requiresLogin?: boolean;
    hiddenWhenLoggedIn?: boolean;
  }[];
  className?: string;
}

export const defaultPages = [
  { name: "Fotos", href: "/" },
  { name: "Dashboard", href: "/dashboard", requiresLogin: true },
  { name: "Logout", href: "/logout", requiresLogin: true },
  { name: "Login", href: "/login", hiddenWhenLoggedIn: true },
];

const Nav = ({ pages = defaultPages, className, ...props }: NavProps) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const jwt = getCookie("jwt");
    if (jwt) {
      setLoggedIn(true);
    }
  }, []);

  const filteredLinks = pages.filter((page) =>
    isLoggedIn
      ? Boolean(page?.requiresLogin) || !page?.hiddenWhenLoggedIn
      : Boolean(page?.hiddenWhenLoggedIn) || !page?.requiresLogin
  );

  return (
    <div
      className={`${styles.navContainer} ${className ? className : ""}`}
      {...props}
    >
      <div className={styles.nav}>
        {filteredLinks.map((p) => (
          <AriaButton href={p.href} key={p.href} variant="link">
            {p.name}
          </AriaButton>
        ))}
      </div>
    </div>
  );
};

export default Nav;
