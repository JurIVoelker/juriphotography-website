import Image from "next/image";

const ImageGalleryChild = ({ image, dimensions }) => {
  return (
    <span>
      <Image
        src={image.urls.regular}
        width={dimensions.width}
        height={dimensions.height}
        alt="test"
      />
    </span>
  );
};

export default ImageGalleryChild;
