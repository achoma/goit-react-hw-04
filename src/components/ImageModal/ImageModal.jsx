import Modal from "react-modal";

import styles from "./ImageModal.module.css";

const ImageModal = ({ modalIsOpen, closeModal, src, alt }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div>
        <img className={styles.modalImg} src={src} alt={alt} />
      </div>
    </Modal>
  );
};

export default ImageModal;
