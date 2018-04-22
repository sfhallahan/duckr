import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Navigation } from "components";
import { bindActionCreators } from "redux";
import * as usersActionCreators from "redux/modules/users";
import * as usersLikesActionCreators from "redux/modules/usersLikes";
import { formatUserInfo } from "helpers/utils";
import { firebaseAuth } from "config/constants";
import { container, innerContainer } from "./styles.css";

class MainContainer extends React.Component {
  componentDidMount() {
    firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        const userData = user.providerData[0];
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid);
        this.props.authUser(user.uid);
        this.props.fetchingUserSuccess(user.uid, userInfo, Date.now());
        this.props.setUsersLikes();
        if (this.props.location.pathname === "/") {
          this.context.router.replace("/feed");
        }
      } else {
        this.props.removeFetchingUser();
      }
    });
  }

  render() {
    return this.props.isFetching === true ? null : (
      <div className={container}>
        <Navigation isAuthed={this.props.isAuthed} />
        <div className={innerContainer}>{this.props.children}</div>
      </div>
    );
  }
}

MainContainer.contextTypes = {
  router: PropTypes.object.isRequired
};

MainContainer.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
  authUser: PropTypes.func.isRequired,
  fetchingUserSuccess: PropTypes.func.isRequired,
  removeFetchingUser: PropTypes.func.isRequired,
  setUsersLikes: PropTypes.func.isRequired
};

export default connect(
  ({ users }) => ({ isAuthed: users.get("isAuthed"), isFetching: users.get("isFetching") }),
  dispatch =>
    bindActionCreators(
      {
        ...usersLikesActionCreators,
        ...usersActionCreators
      },
      dispatch
    )
)(MainContainer);
