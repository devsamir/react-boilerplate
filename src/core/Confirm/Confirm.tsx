import React, { Fragment } from "react";
import Button from "../Button/Button";
import Modal from "react-modal";
import "./confirm.scss";

interface Props {
  show: boolean;
  onClose: any;
  onClick: any;
  loading: boolean;
}
const customStyles = {
  content: {
    maxWidth: "360px",
    width: "80%",
    margin: "0 1rem",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "min-content",
    maxHeight: "80vh",
  },
};

const Confirm: React.FC<Props> = ({ onClose, show, loading, onClick }) => {
  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      style={customStyles}
      overlayClassName="confirm--overlay"
    >
      <div className={`confirm--container`}>
        <h3 className="confirm--title">Yakin Hapus Data ?</h3>
        <span className="confirm--text">
          Data yang sudah dihapus tidak akan kembali.
        </span>
        <div className="confirm--button-container">
          <Button
            type="button"
            className="confirm--button-cancel"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            type="submit"
            className="confirm--button-action"
            loading={loading}
            onClick={onClick}
          >
            Hapus
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Confirm;
