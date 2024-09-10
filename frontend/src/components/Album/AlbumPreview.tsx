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
  const { name } = albumMeta?.attributes || {};
  const renderWidth = 144;

  let previewImageSizes = `${renderWidth}px`;
  if (
    image?.data?.attributes?.height > 0 &&
    image?.data?.attributes?.width &&
    image.data.attributes.width / image.data.attributes.height > 1
  ) {
    const scaleFactor = renderWidth / image.data.attributes.width;
    const scaledWidth = image.data.attributes.width * scaleFactor;
    const scaledHeight = image.data.attributes.height * scaleFactor;
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
          {image?.data && (
            <StrapiImage
              img={image?.data}
              className={styles.image}
              sizes={previewImageSizes}
            />
          )}
          {!image?.data && (
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
