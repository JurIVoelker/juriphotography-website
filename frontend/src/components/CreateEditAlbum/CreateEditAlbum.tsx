"use client";
import { useState } from "react";
import AriaDatePicker from "../AriaDatePicker/AriaDatePicker";
import { AriaTextField } from "../AriaTextField/AriaTextField";
import AriaButton from "../Button/Button";
import styles from "./CreateEditAlbum.module.scss";
import ImagePreview from "../ImagePreview/ImagePreview";
import { DialogTrigger, Form } from "react-aria-components";
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
import {
  ALBUM_CREATED_TOAST_MESSAGE,
  ALBUM_EDITED_TOAST_MESSAGE,
} from "../../constants/constants";
import { useRouter } from "next/navigation";
import { getStrapiData } from "../../utils/apiUtils";
import { AriaSpinner } from "../AriaSpinner/AriaSpinner";
import { AlbumType } from "../../../types/strapiTypes";
import { parseDate } from "@internationalized/date";
import DeleteAlbumModal from "../Modal/DeleteAlbumModal";

interface CreateEditAlbumProps {
  album?: AlbumType;
  isEdit?: boolean;
}

export const CreateEditAlbum: React.FC<CreateEditAlbumProps> = ({
  album,
  isEdit,
}) => {
  const [images, setImages] = useState(album?.attributes?.images || []);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setUploading] = useState(false);
  const { push } = useRouter();

  const handleAddImage = (fileList) => {
    const newUrls = Array.from(fileList).map((file) =>
      // @ts-ignore
      ({ file, url: URL.createObjectURL(file) })
    );
    // @ts-ignore
    setImages((images) => [...images, ...newUrls]);
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

  const createAlbum = async (name, date, slug) => {
    try {
      const imageIds = await uploadImages(images);
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

  const editAlbum = async (name, date) => {
    try {
      const imageUploads = [];

      images.forEach((image, i) => {
        if (!image?.image) {
          imageUploads.push({ index: i, image });
        }
      });

      const uploadedImagesIds = await uploadImages(
        imageUploads.map((image) => image.image)
      );

      const imageComponentBody = [];
      images.forEach((image, i) => {
        if (image?.image) {
          imageComponentBody.push({ image: image.image.data.id });
        } else {
          const uploadedImageIndex = imageUploads.findIndex(
            (image) => image.index === i
          );
          const id = uploadedImagesIds[uploadedImageIndex];
          imageComponentBody.push({ image: id });
        }
      });

      await axios.put(
        getApiUrl(`/albums/${album.id}`),
        {
          data: {
            name,
            date,
            images: imageComponentBody,
          },
        },
        getAuthHeader()
      );
    } catch (error) {
      console.log(error);
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

    if (!isEdit) {
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
    }

    try {
      if (!isEdit) {
        // Upload images and create album
        await createAlbum(name, date, slug);
        toastQueue.add({ text: ALBUM_CREATED_TOAST_MESSAGE });
      } else {
        await editAlbum(name, date);
        toastQueue.add({ text: ALBUM_EDITED_TOAST_MESSAGE });
      }

      push("/dashboard");
    } catch (error) {
      console.error("Error during album creation:", error);
    }
    setUploading(false);
  };

  const handleDeleteImage = async (i) => {
    setImages((images) => images.filter((_, arrayIndex) => arrayIndex !== i));
  };

  return (
    <div className={styles.albumWrapper}>
      <Form className={styles.albumSidePanel} onSubmit={handleSubmit}>
        <div className={styles.inputSection}>
          <AriaTextField
            label="Albumname"
            isRequired
            defaultValue={album?.attributes?.name || ""}
          />
          <AriaDatePicker
            isRequired
            defaultValue={album ? parseDate(album.attributes.date) : ""}
          />
        </div>
        <div className={styles.buttonSection}>
          <AriaButton variant="outline" href="/" isDisabled={isUploading}>
            Verwerfen
          </AriaButton>
          {isEdit && (
            <DialogTrigger>
              <DeleteAlbumModal album={album} />
              <AriaButton variant="outline" isDisabled={isUploading}>
                Album löschen
              </AriaButton>
            </DialogTrigger>
          )}
          <AriaButton type="submit" isDisabled={isUploading}>
            Veröffentlichen
          </AriaButton>
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
              <ImagePreview
                key={i}
                // @ts-ignore
                src={img?.url}
                strapiImage={img?.image ? img.image : null}
                handleDelete={() => handleDeleteImage(i)}
              />
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

            {!isEdit && <p>Album wird hochgeladen ({uploadProgress}%)...</p>}
            {isEdit && (
              <p>Änderungen werden gespeichert ({uploadProgress}%)...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateEditAlbum;
