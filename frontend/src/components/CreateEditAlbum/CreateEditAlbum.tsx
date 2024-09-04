import { AriaTextField } from "../AriaTextField/AriaTextField";
import AriaButton from "../Button/Button";
import styles from "./CreateEditAlbum.module.scss";

export const CreateEditAlbum = () => {
  return (
    <div className={styles.albumWrapper}>
      <div className={styles.albumSidePanel}>
        <div className={styles.inputSection}>
          <AriaTextField label="Albumname" />
        </div>
        <div className={styles.buttonSection}>
          <AriaButton variant="outline">Verwerfen</AriaButton>
          <AriaButton>Als Entwurf speichern</AriaButton>
          <AriaButton>Veröffentlichen</AriaButton>
        </div>
      </div>
      <div className={styles.imageSelection}></div>
    </div>
  );
};

export default CreateEditAlbum;
