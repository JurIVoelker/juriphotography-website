import React from "react";
import ImageGallery from "../components/ImageGallery/ImageGallery";
import { getRandomImages } from "../utils/randomImages";

export default async function Home() {
  const images = await getRandomImages();
  return (
    <>
      <h1>Hi</h1>
      <ImageGallery images={images} />
    </>
  );
}

// async function getPageMeta() {
//   // const res = await fetch("https://api.unsplash.com/search/photos", { next: { revalidate: 3600 } })
//   const res = await getImages();
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data')
//   }

//   return res.json()
// }
