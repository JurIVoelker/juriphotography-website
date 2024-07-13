import dynamic from "next/dynamic";
import React from "react";
const GalleryImage = dynamic(() => import("./GalleryImage"), {
  ssr: false,
});
import "./ImageGallery.css";

interface StrapiImage {
  attributes: {
    url: String;
    width: Number;
    height: Number;
  };
}

// @ts-ignore
interface ImageGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  images: StrapiImage[];
  transitionConfig?: {
    transitionDuration?: string;
    transitionTimingFunction?: string;
  };
  className?: string;
  isDefaultStyles?: boolean;
  loadingBackground?: string;
  imageUrl?: string;
  defaultWidth?: number;
}

export const ImageGallery = ({
  images,
  transitionConfig = {},
  loadingBackground,
  isDefaultStyles = true,
  className,
  imageUrl,
  ...props
}: ImageGalleryProps) => {
  const _className = !isDefaultStyles
    ? className
    : `${className ? className + " " : ""}imageGallery`;

  return (
    <div {...props} className={_className}>
      {images.map((image, index) => (
        <GalleryImage
          // @ts-ignore
          key={index}
          image={image}
          {...transitionConfig}
          loadingBackground={loadingBackground}
          imageUrl={imageUrl}
        />
      ))}
    </div>
  );
};
