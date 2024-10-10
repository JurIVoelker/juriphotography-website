"use client";
import { useState } from "react";
import { ImageType } from "../../../types/strapiTypes";
import { sizesGallery } from "../../utils/strapiUtils";
import { StrapiImage } from "../StrapiImage/StrapiImage";
import styles from "./Gallery.module.scss";
import GalleryItem from "./GalleryItem";

interface GalleryProps {
  images: ImageType[];
  className?: string;
  handleSelectImage: (image: ImageType) => void;
}

export const Gallery: React.FC<GalleryProps> = ({
  images,
  className,
  handleSelectImage,
  ...props
}) => {
  const handleOpenGallery = (id) => {
    const image = images.find((image) => image.image.id === id);
    if (!image) return;
    handleSelectImage(image);
  };

  return (
    <div className={`${styles.gallery} ${className || ""}`} {...props}>
      {images.map((image, i) => (
        <StrapiImage
          img={image.image}
          key={i}
          className={styles.image}
          sizes={sizesGallery}
          onClick={() => {
            handleOpenGallery(image.image.id);
          }}
        />
      ))}
    </div>
  );
};

export default Gallery;
