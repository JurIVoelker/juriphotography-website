import { findSmallestIndex } from "../../utils/arrayUtils";
import ClientGallery from "./ClientGallery";

export const Gallery = ({
  images,
  breakPoints = [768, 992, 1200],
  ...props
}) => {
  // Server side component that calculates the rows for media querys

  const rows = [];
  for (let i = 0; i < breakPoints.length + 1; i++) {
    const row = Array.from({ length: i + 1 }, () => []);
    const rowCount = Array(i + 1).fill(0);

    for (const image of images) {
      const smallestIndex = findSmallestIndex(rowCount);
      row[smallestIndex].push(image);
      const { width, height } = image.image.data.attributes;
      rowCount[smallestIndex] += height / width;
    }
    rows.push(row);
  }
  return <ClientGallery rows={rows} breakPoints={breakPoints} {...props} />;
};

export default Gallery;
