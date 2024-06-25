import type { Schema, Attribute } from '@strapi/strapi';

export interface ContentImage extends Schema.Component {
  collectionName: 'components_content_images';
  info: {
    displayName: 'image';
    icon: 'picture';
    description: '';
  };
  attributes: {
    imageTitle: Attribute.String;
    location: Attribute.Component<'meta.location'>;
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface MetaLocation extends Schema.Component {
  collectionName: 'components_meta_locations';
  info: {
    displayName: 'location';
    icon: 'pinMap';
  };
  attributes: {
    latitude: Attribute.String;
    longitude: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'content.image': ContentImage;
      'meta.location': MetaLocation;
    }
  }
}
