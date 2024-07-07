import qs from "qs";

export async function getStrapiData(path, options) {
  if (!path) throw new Error("path is undefined");

  const strapiUrl = "http://127.0.0.1:1337/api";
  const queryString = qs.stringify(options);

  const requestString = `${strapiUrl}${
    path.at(0) === "/" ? "" : "/"
  }${path}?${queryString}`;

  console.log(requestString);
  let res;
  try {
    res = await fetch(requestString);
  } catch (error) {
    throw new Error("fetch failed", error);
  }
  return res.json();
}
