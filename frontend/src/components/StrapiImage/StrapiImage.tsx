"use client";
import Image from "next/image";
import { defaultStrapiSizes, getStrapiImage } from "../../utils/strapiUtils";

interface StrapiImageProps {
  img: {
    data: {
      attributes: {
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
      };
    };
  };
  alt?: string;
  sizes?: string;
}

export const StrapiImage = ({
  img,
  alt = "bild",
  sizes = defaultStrapiSizes,
  ...props
}: StrapiImageProps) => {
  const { width, height } = img.data.attributes;
  return (
    <Image
      src={getStrapiImage(img)}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      {...props}
    />
  );
};
