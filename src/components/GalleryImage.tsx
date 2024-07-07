"use client";
import Image from "next/image";
import React, { useState } from "react";

interface GalleryImageProps {
  image: any;
  transitionDuration?: string;
  transitionTimingFunction?: string;
  loadingBackground?: string;
  imageUrl?: string;
}

const GalleryImage = ({
  image,
  transitionDuration = "250ms",
  transitionTimingFunction = "ease-in-out",
  loadingBackground = "rgb(243, 243, 243)",
  imageUrl = "http://127.0.0.1:1337",
  ...props
}: GalleryImageProps) => {
  const [style, setStyle] = useState({
    opacity: "0",
    height: "auto",
    transitionDuration: transitionDuration,
    transitionProperty: "opacity",
    transitionTimingFunction: transitionTimingFunction,
  });

  return (
    <div style={{ backgroundColor: loadingBackground }} {...props}>
      <Image
        src={`${imageUrl}${image.attributes.url}`}
        alt=""
        width={300}
        height={400}
        onLoadingComplete={() => {
          setStyle((prev) => ({ ...prev, opacity: "1" }));
        }}
        style={style}
      />
    </div>
  );
};

export default GalleryImage;
