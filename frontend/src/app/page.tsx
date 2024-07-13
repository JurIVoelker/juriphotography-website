import React from "react";
import { getStrapiData } from "../utils/apiUtils.js";
import { ImageGallery } from "next-strapi-image-gallery";

export default async function Home() {
  const images = await getImages();
  return (
    <>
      <div>
        <h1>Hi</h1>
        <h2>aweawe</h2>
      </div>
      {/* <ImageGallery images={images} /> */}
    </>
  );
}

async function getImages() {
  const res = await getStrapiData("test-page", { populate: "*" });
  const { images } = res.data.attributes;
  return images.data;
}
