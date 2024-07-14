export function getStrapiImage(image) {
  const url = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";
  if (image?.data?.attributes?.url) {
    return `${url}${image?.data?.attributes?.url}`;
  }
}
