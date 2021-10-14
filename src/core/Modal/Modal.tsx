import React, { useState, useEffect, Fragment } from "react";
import ReactModal from "react-modal";
import "./modal.scss";

interface Props {
  show: boolean;
  onClose: any;
  width: string;
}

const Modal: React.FC<Props> = ({ onClose, show, children, width }) => {
  const [customStyles, setCustomStyles] = useState({});
  useEffect(() => {
    setCustomStyles({
      content: {
        maxWidth: width,
        width: "80%",
        margin: "0 1rem",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        height: "min-content",
        maxHeight: "80vh",
      },
    });
  }, []);
  return (
    <ReactModal
      isOpen={show}
      onRequestClose={onClose}
      style={customStyles}
      overlayClassName="modal--overlay"
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
