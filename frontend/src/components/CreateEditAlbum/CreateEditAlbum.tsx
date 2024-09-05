"use client";
import { useState } from "react";
import AriaDatePicker from "../AriaDatePicker/AriaDatePicker";
import { AriaTextField } from "../AriaTextField/AriaTextField";
import AriaButton from "../Button/Button";
import styles from "./CreateEditAlbum.module.scss";
import ImagePreview from "../ImagePreview/ImagePreview";
import { Form } from "react-aria-components";
import axios from "axios";
import { getApiUrl } from "../../utils/strapiUtils";
import { getAuthHeader } from "../../utils/authUtils";
import slugify from "slugify";
import { toastQueue } from "../Toast/GlobalToastRegion";
import {
  MISSING_FORM_DATA_ON_CREATE_ARTICLE,
  NAME_OF_ALBUM_MUST_BE_UNIQUE,
  STRAPI_ERROR_UNIQUE_ATTRIBUTE,
  UNEXPECTED_ERROR_WHEN_CREATING_ALBUM,
  UNEXPECTED_ERROR_WHEN_UPLOADING_IMAGES,
} from "../../constants/errorMessages";
import { ALBUM_CREATED_TOAST_MESSAGE } from "../../constants/constants";
import { useRouter } from "next/navigation";
import { getStrapiData } from "../../utils/apiUtils";
import { AriaSpinner } from "../AriaSpinner/AriaSpinner";

export const CreateEditAlbum = () => {
  const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setUploading] = useState(false);
  const { push } = useRouter();

  const handleAddImage = (fileList) => {
    const newUrls = Array.from(fileList).map((file) =>
      // @ts-ignore
      ({ file, url: URL.createObjectURL(file) })
    );
    setImages(newUrls);
  };

  const handleAlbumCreationError = (error, name) => {
    const errorMessage = error?.response?.data?.error?.message;

    if (errorMessage === STRAPI_ERROR_UNIQUE_ATTRIBUTE) {
      toastQueue.add({
        text: NAME_OF_ALBUM_MUST_BE_UNIQUE(name),
        variant: "error",
      });
    } else {
      toastQueue.add({
        text: UNEXPECTED_ERROR_WHEN_CREATING_ALBUM,
        variant: "error",
      });
    }
  };

  // Upload images to the server
  const uploadImages = async (images) => {
    if (!images.length) return;
    const formData = new FormData();
    formData.append("ref", "api::album.album");

    images.forEach((image) => {
      formData.append("files", image.file);
    });

    try {
      const res = await axios.post(getApiUrl("/upload"), formData, {
        ...getAuthHeader(),
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total;
          const loaded = progressEvent.loaded;
          const percentCompleted = (loaded * 100) / total;
          setUploadProgress(
            percentCompleted > 0 ? Math.round((percentCompleted * 5) / 6) : 0
          ); // Update the progress state
        },
      });
      return res.data.map((image) => image.id);
    } catch (error) {
      toastQueue.add({
        text: UNEXPECTED_ERROR_WHEN_UPLOADING_IMAGES,
        variant: "error",
      });
    }
  };

  const isSlugAvailable = async (slug) => {
    const allAlbums = await getStrapiData("albums", {
      publicationState: "preview",
      pagination: {
        start: 0,
        limit: 10000,
      },
    });
    const slugs = allAlbums.data.map((album) => album.attributes.slug);
    return !slugs.includes(slug);
  };

  const createAlbum = async (name, date, slug, imageIds) => {
    try {
      await axios.post(
        getApiUrl("/albums"),
        {
          data: {
            name,
            date,
            slug,
            images: imageIds?.length
              ? imageIds.map((id) => ({ image: id }))
              : [],
          },
        },
        getAuthHeader()
      );
    } catch (error) {
      handleAlbumCreationError(error, name);
      throw new Error("Album creation failed");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUploading(true);

    // Get form values
    const name = event.target[0]?.value;
    const date = new Date(event.target[1]?.value);
    const slug = slugify(name);

    // Validate inputs
    if (!name || !date || !slug) {
      toastQueue.add({
        text: MISSING_FORM_DATA_ON_CREATE_ARTICLE,
        variant: "error",
      });
      setUploading(false);
      return;
    }

    // Validate if slug is already used by someone else
    const slugAvailable = await isSlugAvailable(slug);
    if (!slugAvailable) {
      toastQueue.add({
        text: NAME_OF_ALBUM_MUST_BE_UNIQUE(name),
        variant: "error",
      });
      setUploading(false);
      return;
    }

    try {
      // Upload images and create album
      const imageIds = await uploadImages(images);
      await createAlbum(name, date, slug, imageIds);

      // Success toast and redirect
      toastQueue.add({ text: ALBUM_CREATED_TOAST_MESSAGE });
      push("/dashboard");
    } catch (error) {
      console.error("Error during album creation:", error);
    }
    setUploading(false);
  };

  return (
    <div className={styles.albumWrapper}>
      <Form className={styles.albumSidePanel} onSubmit={handleSubmit}>
        <div className={styles.inputSection}>
          <AriaTextField label="Albumname" isRequired />
          <AriaDatePicker isRequired />
        </div>
        <div className={styles.buttonSection}>
          <AriaButton variant="outline" href="/">
            Verwerfen
          </AriaButton>
          {/* <AriaButton type="submit">Als Entwurf speichern</AriaButton> */}
          <AriaButton type="submit">Veröffentlichen</AriaButton>
        </div>
      </Form>
      <div
        className={`${styles.imageSelectionWrapper} ${
          isUploading ? styles.uploading : ""
        }`}
      >
        {!isUploading && (
          <div className={styles.imageSelection}>
            {images.map((img, i) => (
              <ImagePreview key={i} src={img.url} />
            ))}
            <ImagePreview isAddImage handleAddImage={handleAddImage} />
          </div>
        )}
        {isUploading && (
          <div className={styles.uploadProgress}>
            <AriaSpinner
              className={styles.spinner}
              value={uploadProgress}
              size={96}
              customStrokeWidth={2}
              isBackgroundVisible
            />
            <p>Album wird hochgeladen ({uploadProgress}%)...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateEditAlbum;
