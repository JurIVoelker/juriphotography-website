export function getStrapiImage(image) {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";
  if (image?.data?.attributes?.url) {
    return `${baseUrl}${image?.data?.attributes?.url}`;
  }
}

export const defaultStrapiSizes =
  "(max-width: 500px) 245px, (max-width: 750px) 500px, (max-width: 1000px) 750px, 1000w";
