import qs from "qs";

export async function getStrapiData(
  path,
  options = {},
  headers = { next: { revalidate: 300 } }
) {
  if (!path) throw new Error("path is undefined");

  const strapiUrl =
    (process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337") + "/api";
  const queryString = qs.stringify(options);

  const requestString = `${strapiUrl}${
    path.at(0) === "/" ? "" : "/"
  }${path}?${queryString}`;

  let res;
  res = await fetch(requestString, headers);
  res = await res.json();
  if (res?.error?.status === 403)
    throw new Error(
      `[403] set missing permissions for "${requestString}" in strapi`
    );
  else if (res?.error?.status === 404)
    throw new Error(`[404] api route "${path}" does not exist`);
  else if (!res.data)
    throw new Error(
      `[${
        res?.error?.status ? res.error.status : "???"
      }] an unexpected error occured when trying to fetch "${path}"`
    );

  return res;
}
