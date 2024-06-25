import React from "react";
import styles from "./ImageGallerySkeleton.module.scss";
import Skeleton from "react-loading-skeleton";

const ImageGallerySkeleton = ({ count = 40 }) => {
  return (
    <div className={styles.skeletonWrapper}>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} height={300} />
      ))}
    </div>
  );
};

export default ImageGallerySkeleton;
