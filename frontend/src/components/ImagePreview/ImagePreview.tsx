"use client";
import { Button, FileTrigger } from "react-aria-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ImagePreview.module.scss";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ACCEPTED_IMAGE_TYPES } from "../../constants/constants";
import Image from "next/image";
import { useState } from "react";

interface ImagePreviewProps {
  src?: any;
  isAddImage?: boolean;
  handleAddImage?: any;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  src,
  isAddImage,
  handleAddImage,
  ...props
}) => {
  const [isLoaded, setLoaded] = useState(false);
  return (
    <div className={styles.imagePreview} {...props}>
      {!isAddImage && (
        <div
          className={`${styles.imageWrapper} ${
            !isLoaded ? styles.notLoaded : ""
          }`}
        >
          <Image
            src={src}
            width={96}
            height={96}
            draggable={false}
            alt="bildvorschau"
            className={styles.image}
            onLoadingComplete={() => setLoaded(true)}
          />
        </div>
      )}
      {isAddImage && (
        <FileTrigger
          acceptedFileTypes={ACCEPTED_IMAGE_TYPES}
          onSelect={handleAddImage}
          allowsMultiple
        >
          <Button className={styles.addImage}>
            <FontAwesomeIcon icon={faPlus} className={styles.icon} />
          </Button>
        </FileTrigger>
      )}
    </div>
  );
};

export default ImagePreview;
