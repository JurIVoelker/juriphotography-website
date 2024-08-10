const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

export function getStrapiImage(image) {
  if (image?.data?.attributes?.url) {
    return `${strapiUrl}${image?.data?.attributes?.url}`;
  } else if (image?.attributes?.url) {
    return `${strapiUrl}${image?.attributes?.url}`;
  }
}

export function getApiUrl(path = "") {
  return strapiUrl + "/api" + (path.at(0) === "/" ? path : `/${path}`);
}

export const sizesDefault =
  "(max-width: 500px) 245px, (max-width: 750px) 500px, (max-width: 1000px) 750px, 1000w";

export const sizesFillScreen =
  "(max-width: 768px) 768px, (max-width: 992px) 992px, (max-width: 1200px) 1200px, 1920px";
