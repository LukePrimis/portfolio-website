import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "../styles/Modal.module.css";
import Gallery from "./gallery";

interface ModalProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const Modal = ({ show, setShow }: ModalProps) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  });
  return show ? (
    <div className={styles.overlay} onClick={() => setShow(false)}>
      <div className={styles.card} onClick={(event) => event.stopPropagation()}>
        <Gallery />
      </div>
    </div>
  ) : null;
};

export default Modal;
