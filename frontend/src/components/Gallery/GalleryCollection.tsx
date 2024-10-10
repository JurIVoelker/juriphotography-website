"use client";

import { useState } from "react";
import { AlbumType } from "../../../types/strapiTypes";
import Gallery from "./Gallery";
import styles from "./GalleryCollection.module.scss";
import GalleryItem from "./GalleryItem";

interface GalleryCollectionProps {
  albums: AlbumType[];
  className?: string;
}

const GalleryCollection: React.FC<GalleryCollectionProps> = ({
  albums,
  className,
  ...props
}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className={`${styles.albumsWrapper} ${className || ""}`} {...props}>
      {albums.map((album, i) => (
        <>
          <h2 className={styles.albumTitle}>{album.name}</h2>
          <Gallery
            handleSelectImage={setSelectedImage}
            images={album.images}
            className={styles.imageGallery}
            key={i}
          />
        </>
      ))}
      <GalleryItem image={selectedImage} handleSelectImage={setSelectedImage} />
    </div>
  );
};

export default GalleryCollection;
