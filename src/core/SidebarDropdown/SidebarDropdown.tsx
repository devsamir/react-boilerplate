import React from "react";
import { Link as ReactLink } from "react-router-dom";
import "./sidebar-dropdown.scss";

interface ButtonProps {
  onClick?: React.Dispatch<React.SetStateAction<boolean>>;
  open?: boolean;
}
interface ContainerProps {
  open?: boolean;
  setSidenav?: React.Dispatch<React.SetStateAction<boolean>>;
}
interface LinkProps {
  setSidenav?: React.Dispatch<React.SetStateAction<boolean>>;
  href: string;
  active?: boolean;
}
interface Props {
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  setSidenav: React.Dispatch<React.SetStateAction<boolean>>;
}

const Button: React.FC<ButtonProps> = ({ onClick, open, children }) => {
  return (
    <>
      <button
        className="sidebar-dropdown--button"
        onClick={onClick.bind(this, !open)}
      >
        {children}
      </button>
    </>
  );
};

const Container: React.FC<ContainerProps> = ({
  children,
  open,
  setSidenav,
}) => {
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { setSidenav });
    }
    return child;
  });
  return (
    <>
      <div
        className={`${
          open ? "sidebar-dropwdown--open" : "sidebar-dropwdown--close"
        } sidebar-dropdown--container`}
      >
        <div>{childrenWithProps}</div>
      </div>
    </>
  );
};
const Link: React.FC<LinkProps> = ({ setSidenav, children, href, active }) => {
  return (
    <ReactLink to={href} style={{ textDecoration: "none" }}>
      <button
        className={`${
          active && "sidebar-dropdown--link-active"
        } sidebar-dropdown--link`}
        onClick={() => {
          setSidenav(false);
        }}
      >
        {children}
      </button>
    </ReactLink>
  );
};
const SidebarDropdown: React.FC<Props> = ({
  onClick,
  open,
  setSidenav,
  children,
}) => {
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { onClick, open, setSidenav });
    }
    return child;
  });
  return <div>{childrenWithProps}</div>;
};

export default {
  Dropdown: SidebarDropdown,
  Button,
  Container,
  Link,
};
