"use client";
import Image from "next/image";
import { sizesDefault, getStrapiImage } from "../../utils/strapiUtils";
import { useState } from "react";

interface StrapiImageProps {
  img: {
    attributes: StrapiImageAttributes;
  };
  alt?: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
}

interface StrapiImageAttributes {
  width: number;
  height: number;
  url: string;
  formats: {
    large: {
      url: string;
    };
    small: {
      url: string;
    };
    thumbnail: {
      url: string;
    };
    medium: {
      url: string;
    };
  };
}

export const StrapiImage = ({
  img,
  alt = "bild",
  sizes = sizesDefault,
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
      style={{
        backgroundColor: isLoading ? "#21222b" : "transparent",
        borderRadius: "0.325rem",
      }}
    >
      <Image
        src={getStrapiImage(img)}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        onLoadingComplete={() => {
          setLoading(false);
        }}
        style={{ opacity: isLoading ? 0 : 1, transition: "opacity 250ms" }}
        {...props}
      />
    </div>
  );
};
