import React from "react";
import { Link } from "react-router-dom";
import "./sidebar-button.scss";

interface Props {
  href: string;
  active?: boolean;
}

const SidebarButton: React.FC<Props> = ({ href, children, active }) => {
  return (
    <Link to={href} style={{ textDecoration: "none" }}>
      <button
        className={`${
          active && "sidebar-button--active"
        } sidebar-button--button`}
      >
        {children}
      </button>
    </Link>
  );
};

export default SidebarButton;
