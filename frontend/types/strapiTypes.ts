export interface AlbumType {
  id: number;
  createdAt: string;
  date: string;
  images: ImageType[];
  name: string;
  publishedAt: string;
  slug: string;
  updatedAt: string;
}

export interface ImageType {
  id: number;
  image: StrapiImageAttributes;
  imageTitle: string | null;
  location: string | null;
}

export interface StrapiImageAttributes {
  width: number;
  height: number;
  url: string;
  formats: {
    large: {
      url: string;
    };
    small: {
      url: string;
    };
    thumbnail: {
      url: string;
    };
    medium: {
      url: string;
    };
  };
}

export interface StrapiImageType {
  data: {
    attributes: StrapiImageAttributes;
    id: number;
  };
}
