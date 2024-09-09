"use client";
import { Link } from "react-aria-components";
import { StrapiImage } from "../StrapiImage/StrapiImage";
import styles from "./AlbumPreview.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPlus } from "@fortawesome/free-solid-svg-icons";

const AlbumPreview = ({
  albumMeta,
  previewImage,
  isAddAlbum = false,
  ...props
}) => {
  const { image } = previewImage || {};
  const { name } = albumMeta?.attributes || {};
  return (
    <Link
      {...props}
      className={styles.link}
      href={isAddAlbum ? "/dashboard/neues-album" : ""}
    >
      {!isAddAlbum && (
        <>
          {image?.data && (
            <StrapiImage img={image?.data} className={styles.image} />
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
