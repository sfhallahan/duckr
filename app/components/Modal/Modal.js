import React from "react";
import PropTypes from "prop-types";
import { default as ReactModal } from "react-modal";
import {
  newDuckTop,
  pointer,
  newDuckInputContainer,
  newDuckInput,
  submitDuckBtn,
  darkBtn
} from "./styles.css";
import { formatDuck } from "helpers/utils";
import { duckFanout } from "redux/modules/ducks";

const modalStyles = {
  content: {
    width: 350,
    margin: "0px auto",
    height: 220,
    borderRadius: 5,
    background: "#EBEBEB",
    padding: 0
  }
};

const { object, string, func, bool } = PropTypes;
Modal.propTypes = {
  duckText: string.isRequired,
  isOpen: bool.isRequired,
  user: object.isRequired,
  openModal: func.isRequired,
  closeModal: func.isRequired,
  updateDuckText: func.isRequired,
  isSubmitDisabled: bool.isRequired,
  duckFanout: func.isRequired
};

export default function Modal(props) {
  function submitDuck() {
    props.duckFanout(formatDuck(props.duckText, props.user));
  }

  return (
    <span className={darkBtn} onClick={props.openModal}>
      {"Tweet"}
      <ReactModal
        style={modalStyles}
        isOpen={props.isOpen}
        onRequestClose={props.closeModal}
        contentLabel="New Tweet Modal"
      >
        <div className={newDuckTop}>
          <span>{"Compose New Tweet"}</span>
          <span onClick={props.closeModal} className={pointer}>
            {"X"}
          </span>
        </div>
        <div className={newDuckInputContainer}>
          <textArea
            onChange={e => props.updateDuckText(e.target.value)}
            value={props.duckText}
            maxLength={140}
            type="text"
            className={newDuckInput}
            placeholder="What's on your mind?"
          />
        </div>
        <button className={submitDuckBtn} disabled={props.isSubmitDisabled} onClick={submitDuck}>
          {"Tweet"}
        </button>
      </ReactModal>
    </span>
  );
}
