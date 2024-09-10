"use client";
import Image from "next/image";
import { sizesDefault, getStrapiImage } from "../../utils/strapiUtils";
import { useState } from "react";
import { StrapiImageAttributes } from "../../../types/strapiTypes";
import styles from "./StrapiImage.module.scss";

interface StrapiImageProps {
  img: {
    attributes: StrapiImageAttributes;
  };
  alt?: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
}

export const StrapiImage = ({
  img,
  alt = "bild",
  sizes = sizesDefault,
  className,
  ...props
}: StrapiImageProps) => {
  const [isLoading, setLoading] = useState(true);

  if (!img?.attributes)
    throw new Error(
      "Image does not have attributes. Maybe you forgot to pass the image.data as prop"
    );

  const { width, height } = img?.attributes || {};

  return (
    <div
      className={`${styles.imageContainer} ${
        isLoading ? "" : styles.isLoaded
      } ${className || ""}`}
    >
      <Image
        src={getStrapiImage(img)}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        onLoad={() => {
          setLoading(false);
        }}
        className={`${styles.image} ${isLoading ? "" : styles.isLoaded}`}
        {...props}
      />
    </div>
  );
};
