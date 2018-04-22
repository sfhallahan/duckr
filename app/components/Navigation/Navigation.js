import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { ModalContainer } from "containers";
import { container, navContainer, link, darkBtn } from "./styles.css";

Navigation.propTypes = ActionLinks.propTypes = NavLinks.propTypes = {
  isAuthed: PropTypes.bool.isRequired
};

function NavLinks({ isAuthed }) {
  return (
    <ul>
      <li>
        <Link className={link} to="/">
          {"Home"}
        </Link>
      </li>
    </ul>
  );
}

function ActionLinks({ isAuthed }) {
  return isAuthed === true ? (
    <ul>
      <li>
        <ModalContainer />
      </li>
      <li>
        <Link className={link} to="/logout">
          {"Logout"}
        </Link>
      </li>
    </ul>
  ) : (
    <ul>
      <li>
        <Link className={darkBtn} to="/auth">
          {"Login"}
        </Link>
      </li>
    </ul>
  );
}

export default function Navigation({ isAuthed }) {
  return (
    <div className={container}>
      <nav className={navContainer}>
        <NavLinks isAuthed={isAuthed} />
        <ActionLinks isAuthed={isAuthed} />
      </nav>
    </div>
  );
}
