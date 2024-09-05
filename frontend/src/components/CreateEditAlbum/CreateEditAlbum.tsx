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
  NAME_OF_ALBUM_MUST_BE_UNIQUE,
  STRAPI_ERROR_UNIQUE_ATTRIBUTE,
  UNEXPECTED_ERROR_WHEN_CREATING_ALBUM,
} from "../../constants/errorMessages";
import { ALBUM_CREATED_TOAST_MESSAGE } from "../../constants/constants";
import { useRouter } from "next/navigation";

export const CreateEditAlbum = () => {
  const [images, setImages] = useState([]);
  const { push } = useRouter();

  const handleAddImage = (fileList) => {
    const newUrls = Array.from(fileList).map((file) =>
      // @ts-ignore
      URL.createObjectURL(file)
    );
    setImages(newUrls);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // get form values
    const name = event.target[0]?.value;
    const date = new Date(event.target[1]?.value);
    const slug = slugify(name);

    if (!name || !date || !slug) {
      return;
    }

    let creationResponse;

    try {
      creationResponse = await axios.post(
        getApiUrl("/albums"),
        {
          data: {
            name,
            date,
            slug,
          },
        },
        getAuthHeader()
      );
    } catch (error) {
      if (
        error?.response?.data?.error?.message === STRAPI_ERROR_UNIQUE_ATTRIBUTE
      ) {
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
      return;
    }

    toastQueue.add({
      text: ALBUM_CREATED_TOAST_MESSAGE,
    });

    push("/dashboard");
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
      <div className={styles.imageSelectionWrapper}>
        <div className={styles.imageSelection}>
          {images.map((img, i) => (
            <ImagePreview key={i} src={img} />
          ))}
          <ImagePreview isAddImage handleAddImage={handleAddImage} />
        </div>
      </div>
    </div>
  );
};

export default CreateEditAlbum;
