import Styles from "./Navbar.module.css";
import close from "../../assets/cancel.png";

function Model({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <>
      <div className={Styles.modalOverlay}>
        <div className={Styles.modalContent}>{children}</div>
        <img
          className={Styles.closeButton}
          src={close}
          onClick={onClose}
          alt=""
        />
      </div>
    </>
  );
}

export default Model;
