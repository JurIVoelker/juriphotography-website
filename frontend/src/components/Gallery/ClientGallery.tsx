"use client";
import { useEffect, useState } from "react";
import { StrapiImage } from "../StrapiImage/StrapiImage";
import styles from "./ClientGallery.module.scss";
import { useDebounce } from "@uidotdev/usehooks";
import { sizesGallery } from "../../utils/strapiUtils";

const ClientGallery = ({ rows, breakPoints, ...props }) => {
  const [visibleRowIndex, setVisibleRowIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const debouncedWindowWidth = useDebounce(width, 200);

  const handleChangeWindowWidth = () => {
    setWidth(window.innerWidth);
  };

  function calcBreakpointIndex(width) {
    let index = breakPoints.length;
    for (let i = 0; i < breakPoints.length; i++) {
      if (width < breakPoints[i]) {
        index = i;
        break;
      }
    }
    return index;
  }

  useEffect(() => {
    setVisibleRowIndex(calcBreakpointIndex(width));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedWindowWidth, breakPoints]);

  useEffect(() => {
    setVisibleRowIndex(calcBreakpointIndex(window.innerWidth));
    window.addEventListener("resize", handleChangeWindowWidth);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleChangeWindowWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container} {...props}>
      {rows[visibleRowIndex].map((row, i) => (
        <div key={i} className={styles.row}>
          {row.map((image, i) => (
            <StrapiImage
              img={image.image.data}
              key={i}
              className={styles.image}
              sizes={sizesGallery}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ClientGallery;
