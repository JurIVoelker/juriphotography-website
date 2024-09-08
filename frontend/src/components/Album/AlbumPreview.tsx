"use client";
import { Link } from "react-aria-components";
import { StrapiImage } from "../StrapiImage/StrapiImage";
import styles from "./AlbumPreview.module.scss";

const AlbumPreview = ({ albumMeta, previewImage, ...props }) => {
  const { image } = previewImage;
  const { name } = albumMeta.attributes;
  return (
    <Link {...props} className={styles.link}>
      <StrapiImage img={image?.data} className={styles.image} />
      <div className={styles.albumName}>{name}</div>
    </Link>
  );
};

export default AlbumPreview;
