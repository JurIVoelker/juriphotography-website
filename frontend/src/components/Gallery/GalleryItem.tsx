"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ImageType } from "../../../types/strapiTypes";
import AriaButton from "../Button/Button";
import styles from "./GalleryItem.module.scss";
import {
  faChevronLeft,
  faChevronRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { StrapiImage } from "../StrapiImage/StrapiImage";

interface GalleryProps {
  image: ImageType | null;
  handleClickNext: () => void;
  handleClickPrevious: () => void;
  className?: string;
  handleSelectImage: (image: ImageType | null) => void;
}

export const GalleryItem: React.FC<GalleryProps> = ({
  image,
  className,
  handleClickPrevious,
  handleClickNext,
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
      <AriaButton
        className={styles.navigationButtons}
        onPress={handleClickPrevious}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </AriaButton>
      <StrapiImage img={image.image} className={styles.image} />
      <AriaButton
        className={styles.navigationButtons}
        onPress={handleClickNext}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </AriaButton>
    </div>
  );
};

export default GalleryItem;
