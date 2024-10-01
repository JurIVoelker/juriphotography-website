"use client";
import { Link } from "react-aria-components";
import { StrapiImage } from "../StrapiImage/StrapiImage";
import styles from "./AlbumPreview.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPlus } from "@fortawesome/free-solid-svg-icons";
import { AlbumType, ImageType } from "../../../types/strapiTypes";

interface AlbumPreviewProps {
  albumMeta?: AlbumType;
  previewImage?: ImageType | null;
  isAddAlbum?: boolean;
  href?: string;
}

const AlbumPreview: React.FC<AlbumPreviewProps> = ({
  albumMeta,
  previewImage,
  isAddAlbum = false,
  href,
  ...props
}) => {
  const { image } = previewImage || {};
  const { name } = albumMeta || {};
  const renderWidth = 144;

  let previewImageSizes = `${renderWidth}px`;
  if (image?.height > 0 && image?.width && image.width / image.height > 1) {
    const scaleFactor = renderWidth / image.width;
    const scaledWidth = image.width * scaleFactor;
    const scaledHeight = image.height * scaleFactor;
    const resizedScaleFactor = renderWidth / scaledHeight;
    const resizedWidth = resizedScaleFactor * scaledWidth;
    previewImageSizes = `${resizedWidth}px`;
  }

  return (
    <Link
      {...props}
      className={styles.link}
      href={href ? href : isAddAlbum ? "/dashboard/neues-album" : ""}
    >
      {!isAddAlbum && (
        <>
          {image && (
            <StrapiImage
              img={image}
              className={styles.image}
              sizes={previewImageSizes}
            />
          )}
          {!image && (
            <div className={`${styles.image} ${styles.addAlbum}`}>
              <FontAwesomeIcon icon={faImage} className={styles.icon} />
            </div>
          )}
          <div className={styles.albumName}>{name}</div>
        </>
      )}
      {isAddAlbum && (
        <>
          <div className={`${styles.image} ${styles.addAlbum}`}>
            <FontAwesomeIcon icon={faPlus} className={styles.icon} />
          </div>
          <div className={styles.albumName}>Album hinzufügen</div>
        </>
      )}
    </Link>
  );
};

export default AlbumPreview;
