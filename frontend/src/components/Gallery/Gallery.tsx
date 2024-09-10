import { ImageType } from "../../../types/strapiTypes";
import { sizesGallery } from "../../utils/strapiUtils";
import { StrapiImage } from "../StrapiImage/StrapiImage";
import styles from "./Gallery.module.scss";

interface GalleryProps {
  images: ImageType[];
}

export const Gallery: React.FC<GalleryProps> = ({ images, ...props }) => {
  return (
    <div className={styles.gallery}>
      {images.map((image, i) => (
        <StrapiImage
          img={image.image.data}
          key={i}
          className={styles.image}
          sizes={sizesGallery}
        />
      ))}
    </div>
  );
};

export default Gallery;
