"use client";

import { useEffect } from "react";
import { deleteCookie, hasCookie } from "../../utils/cookieUtils";
import { useRouter } from "next/navigation";

const Logout = () => {
  const { push } = useRouter();
  useEffect(() => {
    if (hasCookie("jwt")) {
      deleteCookie("jwt");
    }
    push("/login");
  });
  return <></>;
};

export default Logout;
