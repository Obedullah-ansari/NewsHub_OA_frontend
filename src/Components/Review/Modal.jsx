import styles from "./Review.module.css";


const Modal = ({ message, onClose }) => {
    return (
      <div className={styles.modalOverlay} >
        <div className={styles.modalContent} >
          <p>{message}</p>
          <button className={styles.closeButton} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  };
  
  export default Modal;
