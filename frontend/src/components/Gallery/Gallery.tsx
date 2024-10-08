import { ImageType } from "../../../types/strapiTypes";
import { sizesGallery } from "../../utils/strapiUtils";
import { StrapiImage } from "../StrapiImage/StrapiImage";
import styles from "./Gallery.module.scss";

interface GalleryProps {
  images: ImageType[];
  className?: string;
}

export const Gallery: React.FC<GalleryProps> = ({
  images,
  className,
  ...props
}) => {
  return (
    <div className={`${styles.gallery} ${className || ""}`} {...props}>
      {images.map((image, i) => (
        <StrapiImage
          img={image.image}
          key={i}
          className={styles.image}
          sizes={sizesGallery}
        />
      ))}
    </div>
  );
};

export default Gallery;
