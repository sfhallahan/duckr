import { bindActionCreators } from "redux";
import { Modal } from "components";
import { connect } from "react-redux";
import * as modalActionCreators from "redux/modules/modal";
import * as ducksActionCreators from "redux/modules/ducks";

function mapStateToProps(state) {
  const { modal, users } = state;
  const duckTextLength = modal.duckText.length;

  return {
    user: users.has("authedId") ? users.get(users.get("authedId")).get("info") : {},
    duckText: modal.duckText,
    isOpen: modal.isOpen,
    isSubmitDisabled: duckTextLength <= 0 || duckTextLength > 140
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...modalActionCreators, ...ducksActionCreators }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
