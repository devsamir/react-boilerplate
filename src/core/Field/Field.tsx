import React from "react";
import "./field.scss";
interface Props {
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
  type?: "text" | "password" | "email" | "file" | "date";
  placeholder?: string;
  label?: string;
  fullWidth?: boolean;
  Form: any;
  name: string;
}

const color = "green";

const Field: React.FC<Props> = ({
  label,
  onKeyPress,
  placeholder,
  type,
  fullWidth,
  Form,
  name,
}) => {
  return (
    <div className={`field--container ${fullWidth && "field--full-width"}`}>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        className={`${
          Form.errors[name] ? ` field--error` : "field--primary"
        }  field--input`}
        onChange={Form.handleChange}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        value={Form.values[name]}
        onBlur={Form.handleBlur}
      />
      {Form.errors[name] && Form.touched[name] && (
        <span className="field--error-text">{Form.errors[name]}</span>
      )}
    </div>
  );
};

export default Field;
