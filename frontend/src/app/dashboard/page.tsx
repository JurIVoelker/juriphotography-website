"use server";

import { AlbumType } from "../../../types/strapiTypes";
import AlbumPreview from "../../components/Album/AlbumPreview";
import Nav from "../../components/Nav/Nav";
import { getStrapiData } from "../../utils/apiUtils";
import styles from "./dashboard.module.scss";

const dashboard = async () => {
  const albumbs: AlbumType[] = await getAlbums();
  return (
    <>
      <Nav />
      <main>
        <h1 className={styles.title}>Homepage Inhalt</h1>
        <div className={styles.albumWrapper}>
          {albumbs.map((album) => {
            const { images } = album?.attributes || {};
            const previewImage = images?.length
              ? images.find((image) => image?.image?.data?.attributes?.url) ||
                images[0]
              : null;

            return (
              <AlbumPreview
                albumMeta={album}
                key={album.id}
                previewImage={previewImage}
                href={`/dashboard/bearbeiten/${album.attributes.slug}`}
              />
            );
          })}
          <AlbumPreview isAddAlbum />
        </div>
      </main>
    </>
  );
};

export default dashboard;

async function getAlbums() {
  const res = await getStrapiData("/albums", {
    populate: {
      images: {
        populate: "*",
      },
    },
  });
  return res.data;
}
