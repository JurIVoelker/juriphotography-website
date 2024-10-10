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

  const getFoundImageData = () => {
    let albumIndex;
    let imageIndex;
    let albumLength;
    albums.forEach((album, i) => {
      const index = album.images.findIndex(
        (image) => image.image.id === selectedImage.image.id
      );
      if (index !== -1) {
        albumIndex = i;
        imageIndex = index;
        albumLength = album.images.length;
      }
    });
    const totalAlbums = albums.length;
    return { albumIndex, imageIndex, albumLength, totalAlbums };
  };

  const handleClickNext = () => {
    const { albumIndex, imageIndex, albumLength, totalAlbums } =
      getFoundImageData();
    if (imageIndex === albumLength - 1) {
      if (albumIndex === totalAlbums - 1) {
        setSelectedImage(albums[0].images[0]);
      } else {
        setSelectedImage(albums[albumIndex + 1].images[0]);
      }
    } else {
      setSelectedImage(albums[albumIndex].images[imageIndex + 1]);
    }
  };

  const handleClickPrevious = () => {
    const { albumIndex, imageIndex, albumLength, totalAlbums } =
      getFoundImageData();
    if (imageIndex === 0) {
      if (albumIndex === 0) {
        setSelectedImage(albums[totalAlbums - 1].images[albumLength - 1]);
      } else {
        setSelectedImage(albums[albumIndex - 1].images[albumLength - 1]);
      }
    } else {
      setSelectedImage(albums[albumIndex].images[imageIndex - 1]);
    }
  };

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
      <GalleryItem
        image={selectedImage}
        handleSelectImage={setSelectedImage}
        handleClickNext={handleClickNext}
        handleClickPrevious={handleClickPrevious}
      />
    </div>
  );
};

export default GalleryCollection;
