import React from "react";
import { getStrapiData } from "../utils/apiUtils.js";
import { getStrapiImage } from "../utils/strapiUtils.js";
import Image from "next/image.js";
import styles from "./page.module.scss";
// import { ImageGallery } from "next-strapi-image-gallery";

export default async function Home() {
  const heroImage = await getPageMeta();
  console.log(heroImage);
  return (
    <>
      <div className={styles.heroImage}>
        <Image src={getStrapiImage(heroImage)} alt="test" fill />
      </div>
      <main>
        <div>
          <h1>Hi</h1>
          <h2>aweawe</h2>
        </div>
      </main>
      {/* <ImageGallery images={images} className={styles.imageGallery} /> */}
    </>
  );
}

async function getPageMeta() {
  const res = await getStrapiData("gallery", { populate: "*" });
  return res.data.attributes.heroImage;
}
