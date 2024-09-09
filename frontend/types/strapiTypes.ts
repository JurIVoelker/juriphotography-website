export interface AlbumType {
  id: number;
  attributes: {
    createdAt: string;
    date: string;
    images: ImageType[];
    name: string;
    publishedAt: string;
    slug: string;
    updatedAt: string;
  };
}

export interface ImageType {
  id: number;
  image: {
    data: {
      id: number;
      attributes: StrapiImageAttributes;
    };
  };
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
