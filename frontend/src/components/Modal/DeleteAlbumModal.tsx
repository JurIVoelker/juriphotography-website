import axios from "axios";
import {
  Button,
  Dialog,
  Heading,
  Modal,
  ModalOverlay,
} from "react-aria-components";
import { toastQueue } from "../Toast/GlobalToastRegion";
import { ALBUM_DELETED_TOAST_MESSAGE } from "../../constants/constants";
import { getApiUrl } from "../../utils/strapiUtils";
import { getAuthHeader } from "../../utils/authUtils";
import { UNEXPECTED_ERROR_WHEN_DELETING_ALBUM } from "../../constants/errorMessages";
import { useRouter } from "next/navigation";
import { AlbumType } from "../../../types/strapiTypes";
import globalStyles from "./modal.module.scss";
import AriaButton from "../Button/Button";

interface DeleteAlbumModalProps {
  album: AlbumType;
}

const DeleteAlbumModal: React.FC<DeleteAlbumModalProps> = ({ album }) => {
  const { push } = useRouter();

  const handleDeleteAlbum = async () => {
    const { documentId } = album;
    if (!documentId) return;
    try {
      await axios.delete(getApiUrl(`/albums/${documentId}`), getAuthHeader());
      toastQueue.add({
        text: ALBUM_DELETED_TOAST_MESSAGE,
      });
      push("/dashboard");
    } catch (error) {
      toastQueue.add({
        text: UNEXPECTED_ERROR_WHEN_DELETING_ALBUM,
        variant: "error",
      });
    }
  };

  return (
    <ModalOverlay className={globalStyles.modalOverlay} isDismissable>
      <Modal className={globalStyles.modal}>
        <Dialog className={globalStyles.dialog}>
          {({ close }) => (
            <>
              <Heading slot="title" className={globalStyles.title}>
                Album löschen
              </Heading>
              <p>Möchtest du das Album "{album.name}" wirklich löschen?</p>
              <div className={globalStyles.buttons}>
                <AriaButton onPress={close} variant="outline">
                  Abbrechen
                </AriaButton>
                <AriaButton onPress={handleDeleteAlbum}>
                  Album löschen
                </AriaButton>
              </div>
            </>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
};

export default DeleteAlbumModal;
