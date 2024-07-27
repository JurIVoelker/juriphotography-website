import React from "react";
import { getStrapiData } from "../utils/apiUtils.js";
import styles from "./page.module.scss";
import { Gallery } from "../components/Gallery/Gallery";
import { StrapiImage } from "../components/StrapiImage/StrapiImage";
import { sizesFillScreen } from "../utils/strapiUtils.js";

export default async function Home() {
  const { heroImage, images } = await getPageMeta();
  return (
    <>
      <div className={styles.heroImage}>
        <StrapiImage
          img={heroImage.data}
          sizes={sizesFillScreen}
          priority={true}
        />
      </div>
      <main>
        <Gallery images={images} className={styles.imageGallery} />
      </main>
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
