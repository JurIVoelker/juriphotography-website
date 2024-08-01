"use client";
import styles from "./ImageTextSection.module.scss";
import { StrapiImage } from "../StrapiImage/StrapiImage";
import ReactMarkdown from "react-markdown";

const ImageTextSection = ({
  children,
  className,
  src,
  markdownText,
  ...props
}) => {
  return (
    <div
      className={`${styles.wrapper} ${className ? className : ""}`}
      {...props}
    >
      <StrapiImage img={src} className={styles.image} />
      <div>
        <ReactMarkdown className={styles.content}>{markdownText}</ReactMarkdown>
        {children}
      </div>
    </div>
  );
};

export default ImageTextSection;
