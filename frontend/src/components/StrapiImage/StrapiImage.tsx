"use client";
import Image from "next/image";
import { sizesDefault, getStrapiImage } from "../../utils/strapiUtils";
import { useState } from "react";
import { StrapiImageAttributes } from "../../../types/strapiTypes";
import styles from "./StrapiImage.module.scss";

interface StrapiImageProps {
  img: StrapiImageAttributes;
  alt?: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
  onClick?: () => void;
}

export const StrapiImage = ({
  img,
  alt = "bild",
  sizes = sizesDefault,
  className,
  onClick,
  ...props
}: StrapiImageProps) => {
  const [isLoading, setLoading] = useState(true);

  const { width, height } = img || {};

  return (
    <div
      className={`${styles.imageContainer} ${
        isLoading ? "" : styles.isLoaded
      } ${className || ""}`}
      onClick={onClick}
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
