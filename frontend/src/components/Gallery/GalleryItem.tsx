"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ImageType } from "../../../types/strapiTypes";
import AriaButton from "../Button/Button";
import styles from "./GalleryItem.module.scss";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface GalleryProps {
  image: ImageType | null;
  className?: string;
  handleSelectImage: (image: ImageType | null) => void;
}

export const GalleryItem: React.FC<GalleryProps> = ({
  image,
  className,
  handleSelectImage,
  ...props
}) => {
  if (!image) return <></>;
  return (
    <div className={`${styles.galleryItem} ${className || ""}`} {...props}>
      <AriaButton
        className={styles.closeButton}
        onPress={() => {
          handleSelectImage(null);
        }}
      >
        <FontAwesomeIcon icon={faXmark} />
      </AriaButton>
    </div>
  );
};

export default GalleryItem;
