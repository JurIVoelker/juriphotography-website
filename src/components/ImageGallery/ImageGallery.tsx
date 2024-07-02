"use client";
const ImageGallery = ({ images }) => {
  const equalizedWidths = equalizeWidths(images);
  return <div></div>;
};

export default ImageGallery;

function equalizeWidths(images) {
  const defaultWidth = 400;
  return images.map((image) => {
    const aspectRatio = image.width / image.height;
    const newHeight = defaultWidth * aspectRatio;
    return {
      ...image,
      width: defaultWidth,
      height: newHeight,
    };
  });
}
