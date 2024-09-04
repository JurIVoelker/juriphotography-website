"use client";
import { useState } from "react";
import AriaDatePicker from "../AriaDatePicker/AriaDatePicker";
import { AriaTextField } from "../AriaTextField/AriaTextField";
import AriaButton from "../Button/Button";
import styles from "./CreateEditAlbum.module.scss";
import ImagePreview from "../ImagePreview/ImagePreview";

export const CreateEditAlbum = () => {
  const [images, setImages] = useState([]);
  const handleAddImage = (fileList) => {
    const newUrls = Array.from(fileList).map((file) =>
      // @ts-ignore
      URL.createObjectURL(file)
    );
    setImages(newUrls);
  };

  return (
    <div className={styles.albumWrapper}>
      <div className={styles.albumSidePanel}>
        <div className={styles.inputSection}>
          <AriaTextField label="Albumname" />
          <AriaDatePicker />
        </div>
        <div className={styles.buttonSection}>
          <AriaButton variant="outline" href="/">
            Verwerfen
          </AriaButton>
          <AriaButton>Als Entwurf speichern</AriaButton>
          <AriaButton>Veröffentlichen</AriaButton>
        </div>
      </div>
      <div className={styles.imageSelectionWrapper}>
        <div className={styles.imageSelection}>
          {images.map((img, i) => (
            <ImagePreview key={i} src={img} />
          ))}
          <ImagePreview isAddImage handleAddImage={handleAddImage} />
        </div>
      </div>
    </div>
  );
};

export default CreateEditAlbum;
