import React from "react";
import { MdWarning } from "react-icons/md";
import Button from "../Button/Button";
import "./error-box.scss";

interface Props {
  errorTitle: string;
  errorText?: string;
  onClick?: any;
  loading?: any;
  buttonText?: string;
}

const ErrorBox: React.FC<Props> = ({
  errorTitle,
  errorText,
  loading,
  onClick,
  buttonText,
}) => {
  return (
    <div className="error-box--container">
      <MdWarning className="error-box--icon" />
      <span className="error-box--title">{errorTitle}</span>
      <span className="error-box--text">{errorText}</span>
      {onClick && (
        <div className="error-box--margin-top">
          <Button
            onClick={onClick}
            loading={loading}
            className="error-box--button"
          >
            {buttonText}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ErrorBox;
