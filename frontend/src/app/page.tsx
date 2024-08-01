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

export default async function Home() {
  const { heroImage, images, profile } = await getPageMeta();
  return (
    <>
      <StrapiImage
        img={heroImage.data}
        sizes={sizesFillScreen}
        priority={true}
        className={styles.heroImage}
      />
      <Nav pages={[{ name: "Fotos", href: "/" }]} className={styles.nav} />
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
        <Gallery images={images} className={styles.imageGallery} />
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
