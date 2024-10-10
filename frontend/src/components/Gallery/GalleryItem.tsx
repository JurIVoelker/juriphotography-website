"use client";
import { ImageType } from "../../../types/strapiTypes";
import styles from "./GalleryItem.module.scss";

interface GalleryProps {
  image: ImageType | null;
  className?: string;
}

export const GalleryItem: React.FC<GalleryProps> = ({
  image,
  className,
  ...props
}) => {
  console.log(image);
  return (
    <div
      className={`${styles.galleryItem} ${className || ""}`}
      {...props}
    ></div>
  );
};

export default GalleryItem;
