import React from "react";
import { FaSpinner } from "react-icons/fa";
import "./button.scss";

interface Props {
  className?: string;
  loading?: boolean;
  onClick?: any;
  type?: "button" | "submit" | "reset";
  iconStart?: any;
  iconEnd?: any;
}

const Button: React.FC<Props> = ({
  children,
  className,
  loading,
  onClick,
  type,
  iconEnd,
  iconStart,
}) => {
  return (
    <button
      type={type || "button"}
      disabled={loading}
      onClick={onClick}
      className={`${className} button--main`}
    >
      {iconStart && <span className="button--icon-start">{iconStart}</span>}
      {children}
      {iconEnd && <span className="button--icon-end">{iconEnd}</span>}
      {loading && (
        <div className={`button--loader ${className}`}>
          <FaSpinner className="button--animate-spin" />
        </div>
      )}
    </button>
  );
};

export default Button;
