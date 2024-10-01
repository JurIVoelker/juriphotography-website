import axios from "axios";
import { getAuthHeader } from "./authUtils";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

export function getStrapiImage(image) {
  if (image?.url) {
    return `${strapiUrl}${image.url}`;
  }
}

export function getApiUrl(path = "") {
  return strapiUrl + "/api" + (path.at(0) === "/" ? path : `/${path}`);
}

export const sizesDefault =
  "(max-width: 500px) 245px, (max-width: 750px) 500px, (max-width: 1000px) 750px, 1000w";

export const sizesGallery =
  "(max-width: 624px) 590px, (max-width: 928px) 440px, (max-width: 1232px) 390px, 290px";

export const sizesFillScreen =
  "(max-width: 768px) 768px, (max-width: 992px) 992px, (max-width: 1200px) 1200px, 1920px";

export async function uploadImage(strapiRef, file, refId, field) {
  const formData = new FormData();
  formData.append("ref", strapiRef);
  formData.append("refId", refId);
  formData.append("field", field);
  formData.append("files", file);

  let imageUpload;
  try {
    imageUpload = await axios.post(
      getApiUrl("/upload"),
      formData,
      getAuthHeader()
    );
  } catch (error) {
    console.error(error);
  }
  return imageUpload;
}
