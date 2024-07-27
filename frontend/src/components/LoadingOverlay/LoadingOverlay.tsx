"use client";
import { useEffect, useState } from "react";
import styles from "./LoadingOverlay.module.scss";
const LoadingOverlay = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined") setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className={`${styles.overlay} ${
        !isLoading ? styles.loadingFinished : ""
      }`}
    />
  );
};

export default LoadingOverlay;
