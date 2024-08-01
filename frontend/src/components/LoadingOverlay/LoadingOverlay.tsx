"use client";
import { useEffect, useState } from "react";
import styles from "./LoadingOverlay.module.scss";
import { useDebounce } from "@uidotdev/usehooks";
const LoadingOverlay = () => {
  const [isLoading, setLoading] = useState(true);
  const debouncedLoading = useDebounce(isLoading, 150);

  useEffect(() => {
    if (typeof window !== "undefined") setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (debouncedLoading || isLoading)
    return (
      <div
        className={`${styles.overlay} ${
          !isLoading ? styles.loadingFinished : ""
        }`}
      />
    );
};

export default LoadingOverlay;
