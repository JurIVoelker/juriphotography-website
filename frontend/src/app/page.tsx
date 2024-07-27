import React from "react";
import { getStrapiData } from "../utils/apiUtils.js";
import styles from "./page.module.scss";
import { Gallery } from "../components/Gallery/Gallery";
import { StrapiImage } from "../components/StrapiImage/StrapiImage";

export default async function Home() {
  const { heroImage, images } = await getPageMeta();
  return (
    <>
      <div className={styles.heroImage}>
        <StrapiImage img={heroImage} />
      </div>
      <main>
        <div>
          <h1>Hi</h1>
        </div>
      </main>
      <Gallery images={[]} className={styles.imageGallery} />
    </>
  );
}

async function getPageMeta() {
  const res = await getStrapiData("page-pictures", {
    populate: {
      heroImage: "*",
      images: {
        populate: "*",
      },
    },
  });
  const { images, heroImage } = res.data.attributes;
  return {
    heroImage,
    images,
  };
}
