import { AlbumType } from "../../../../../types/strapiTypes";
import CreateEditAlbum from "../../../../components/CreateEditAlbum/CreateEditAlbum";
import Nav from "../../../../components/Nav/Nav";
import { getStrapiData } from "../../../../utils/apiUtils";
import styles from "./edit-album-page.module.scss";

const EditAlbumPage = async ({ params }: { params: { slug: string } }) => {
  const album: AlbumType = await getAlbum(params.slug);
  if (!album) return <p>404</p>; // TODO Return 404 page
  return (
    <>
      <Nav />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1>Neues Album</h1>
          <CreateEditAlbum album={album} isEdit />
        </div>
      </main>
    </>
  );
};

export default EditAlbumPage;

async function getAlbum(slug) {
  const res = await getStrapiData(
    "albums",
    {
      populate: {
        images: {
          populate: {
            image: "*",
          },
        },
      },
      filters: {
        slug: {
          $eq: slug,
        },
      },
    },
    { next: { revalidate: 0 } }
  );
  const albumArray = res.data;
  if (albumArray?.length > 0) {
    return albumArray[0];
  }
}
