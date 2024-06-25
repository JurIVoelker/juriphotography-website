"use client";
import React, { useEffect, useState } from "react";
import { scaleToHeight } from "../../utils/imageUtils";
import styles from "./ImageGallery.module.scss";
import useDebouncedScreenWidth from "../../hooks/useDebouncedScreenWidth";
import "react-loading-skeleton/dist/skeleton.css";
import ImageGalleryChild from "./ImageGalleryChild";
import ImageGallerySkeleton from "./ImageGallerySkeleton";

const ImageGallery = ({ images, maxImages = 6, minImages = 3 }) => {
  const { windowWidth, isWindowResizing } = useDebouncedScreenWidth(100);

  return (
    <div>
      <div className={styles.photosWrapper}>
        {isWindowResizing && <ImageGallerySkeleton />}
        {!isWindowResizing && (
          <>
            {images.map((image, index) => {
              const dimensions = scaleToHeight(image.width, image.height, 400);
              return (
                <ImageGalleryChild
                  image={image}
                  dimensions={dimensions}
                  key={index}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
