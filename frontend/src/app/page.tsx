import React from "react";
import { getStrapiData } from "../utils/apiUtils.js";
// import { ImageGallery } from "next-strapi-image-gallery";
// import styles from "./page.module.scss";

export default async function Home() {
  const images = await getImages();
  return (
    <>
      <div>
        <h1>Hi</h1>
        <h2>aweawe</h2>
      </div>
      {/* <ImageGallery images={images} className={styles.imageGallery} /> */}
    </>
  );
}

async function getImages() {
  const res = await getStrapiData("test-page", { populate: "*" });
  const { images } = res.data.attributes;
  return images.data;
}
