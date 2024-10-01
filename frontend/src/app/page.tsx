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
import { AlbumType, StrapiImageAttributes } from "../../types/strapiTypes.js";

interface HomePageProps {
  heroImage: StrapiImageAttributes;
  profile: { id: number; text: string; image: StrapiImageAttributes };
}

export default async function Home() {
  const albums: AlbumType[] = await getAlbums();
  const pageMeta: HomePageProps = await getPageMeta();
  const { heroImage, profile } = pageMeta;
  return (
    <>
      <StrapiImage
        img={heroImage}
        sizes={sizesFillScreen}
        priority
        className={styles.heroImage}
      />
      <Nav className={styles.nav} />
      <main>
        <div className={styles.profileWrapper}>
          <ImageTextSection
            src={profile.image}
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
            <h2 className={styles.albumTitle}>{album.name}</h2>
            <Gallery
              images={album.images}
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
    },
  });
  return res.data;
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
  return albums.filter((album) => Boolean(album.images.length));
}
