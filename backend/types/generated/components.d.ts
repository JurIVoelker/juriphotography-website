import type { Struct, Schema } from '@strapi/strapi';

export interface MetaLocation extends Struct.ComponentSchema {
  collectionName: 'components_meta_locations';
  info: {
    displayName: 'location';
    icon: 'pinMap';
  };
  attributes: {
    latitude: Schema.Attribute.String;
    longitude: Schema.Attribute.String;
  };
}

export interface ContentImage extends Struct.ComponentSchema {
  collectionName: 'components_content_images';
  info: {
    displayName: 'image';
    icon: 'picture';
    description: '';
  };
  attributes: {
    imageTitle: Schema.Attribute.String;
    location: Schema.Attribute.Component<'meta.location', false>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface ContentImageText extends Struct.ComponentSchema {
  collectionName: 'components_content_image_texts';
  info: {
    displayName: 'ImageText';
    icon: 'picture';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    text: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'meta.location': MetaLocation;
      'content.image': ContentImage;
      'content.image-text': ContentImageText;
    }
  }
}
