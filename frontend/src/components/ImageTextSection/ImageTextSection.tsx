"use client";
import styles from "./ImageTextSection.module.scss";
import { StrapiImage } from "../StrapiImage/StrapiImage";
import ReactMarkdown from "react-markdown";
import { ReactNode } from "react";
import { StrapiImageAttributes } from "../../../types/strapiTypes";
import { SIZES_PROFILE } from "../../utils/strapiUtils";

interface ImateTextSectionProps {
  children?: ReactNode;
  className?: string;
  src: StrapiImageAttributes;
  markdownText: string;
}

const ImageTextSection: React.FC<ImateTextSectionProps> = ({
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
      <StrapiImage img={src} className={styles.image} sizes={SIZES_PROFILE} />
      <div>
        <ReactMarkdown className={styles.content}>{markdownText}</ReactMarkdown>
        {children}
      </div>
    </div>
  );
};

export default ImageTextSection;
