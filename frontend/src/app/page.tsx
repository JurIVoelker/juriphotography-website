import React from "react";
import { getStrapiData } from "../utils/apiUtils.js";
import styles from "./page.module.scss";
import { Gallery } from "../components/Gallery/Gallery";
import { StrapiImage } from "../components/StrapiImage/StrapiImage";
import { sizesFillScreen } from "../utils/strapiUtils.js";
import Nav from "../components/Nav/Nav";
import ImageTextSection from "../components/ImageTextSection/ImageTextSection";
import AriaButton from "../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { AlbumType } from "../../types/strapiTypes.js";

export default async function Home() {
  const { heroImage, profile } = await getPageMeta();
  const albums: AlbumType[] = await getAlbums();
  return (
    <>
      <StrapiImage
        img={heroImage.data}
        sizes={sizesFillScreen}
        priority
        className={styles.heroImage}
      />
      <Nav className={styles.nav} />
      <main>
        <div className={styles.profileWrapper}>
          <ImageTextSection
            src={profile.image.data}
            className={styles.profile}
            markdownText={profile.text}
          >
            <div className={styles.buttons}>
              <AriaButton variant="solid">
                Webentwicklung
                <FontAwesomeIcon icon={faChevronRight} />
              </AriaButton>
              <AriaButton variant="solid">
                Fotografie
                <FontAwesomeIcon icon={faChevronRight} />
              </AriaButton>
            </div>
          </ImageTextSection>
        </div>
        {albums.map((album, i) => (
          <>
            <h2 className={styles.albumTitle}>{album.attributes.name}</h2>
            <Gallery
              images={album.attributes.images}
              className={styles.imageGallery}
              key={i}
            />
          </>
        ))}
      </main>
    </>
  );
}

async function getPageMeta() {
  const res = await getStrapiData("page-pictures", {
    populate: {
      heroImage: "*",
      profile: {
        populate: "*",
      },
      images: {
        populate: "*",
      },
    },
  });
  return res.data.attributes;
}

async function getAlbums() {
  const res = await getStrapiData("albums", {
    populate: {
      images: {
        populate: "*",
      },
    },
  });
  const albums: AlbumType[] = res.data;
  return albums.filter((album) => Boolean(album.attributes.images.length));
}
