import auth, { saveUser, logout } from "helpers/auth";
import { formatUserInfo } from "helpers/utils";
import { fetchUser } from "helpers/api";
import { Map, fromJS } from "immutable";

const AUTH_USER = "AUTH_USER";
const UNAUTH_USER = "UNAUTH_USER";
const FETCHING_USER = "FETCHING_USER";
const FETCHING_USER_FAILURE = "FETCHING_USER_FAILURE";
const FETCHING_USER_SUCCESS = "FETCHING_USER_SUCCESS";
const REMOVE_FETCHING_USER = "REMOVE_FETCHING_USER";

// User Actions

export function authUser(uid) {
  return {
    type: AUTH_USER,
    uid
  };
}

export function unauthUser() {
  return {
    type: UNAUTH_USER
  };
}

export function fetchingUser() {
  return {
    type: FETCHING_USER
  };
}

export function fetchingUserFailure(error) {
  console.warn(error);
  return {
    type: FETCHING_USER_FAILURE,
    error: "Error fetching user"
  };
}

export function fetchingUserSuccess(uid, user, timestamp) {
  return {
    type: FETCHING_USER_SUCCESS,
    uid,
    user,
    timestamp
  };
}

// Fetch user for profile
export function fetchAndHandleUser(uid) {
  return function(dispatch) {
    dispatch(fetchingUser());
    return fetchUser(uid)
      .then(user => dispatch(fetchingUserSuccess(uid, user, Date.now())))
      .catch(error => dispatch(fetchingUserFailure(error)));
  };
}

// Helper function to handle Auth (uses redux-thunk since it returns a function)
export function fetchAndHandleAuthedUser() {
  return function(dispatch) {
    dispatch(fetchingUser());
    return auth()
      .then(({ user, credentials }) => {
        const userData = user.providerData[0];
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid);
        return dispatch(fetchingUserSuccess(user.uid, userInfo, Date.now()));
      })
      .then(user => {
        return saveUser(user);
      })
      .then(user => {
        console.log("auth user ", user);
        return dispatch(authUser(user.uid));
      })
      .catch(error => dispatch(fetchingUserFailure(error)));
  };
}

// Thunk
export function logoutAndUnauth() {
  return function(dispatch) {
    logout();
    dispatch(unauthUser());
  };
}

export function removeFetchingUser() {
  return {
    type: REMOVE_FETCHING_USER
  };
}

// Initial State

const initialUserState = fromJS({
  lastUpdated: 0,
  info: {
    name: "",
    uid: "",
    avatar: ""
  }
});

// Users Reducer

function user(state = initialUserState, action) {
  switch (action.type) {
    case FETCHING_USER_SUCCESS:
      return state.merge({
        info: action.user,
        lastUpdated: action.timestamp
      });
    default:
      return state;
  }
}

const initialUsersState = Map({
  isFetching: true,
  error: "",
  isAuthed: false,
  authedId: ""
});

export default function users(state = initialUsersState, action) {
  switch (action.type) {
    case AUTH_USER:
      return state.merge({
        isAuthed: true,
        authedId: action.uid
      });
    case UNAUTH_USER:
      return state.merge({
        isAuthed: false,
        authedId: ""
      });
    case FETCHING_USER:
      return state.merge({
        isFetching: true
      });
    case REMOVE_FETCHING_USER:
      return state.merge({
        isFetching: false
      });
    case FETCHING_USER_FAILURE:
      return state.merge({
        isFetching: false,
        error: action.error
      });
    case FETCHING_USER_SUCCESS:
      return action.user === null
        ? state.merge({
            isFetching: false,
            error: ""
          })
        : state.merge({
            isFetching: false,
            error: "",
            [action.uid]: user(state.get(action.uid), action)
          });
    default:
      return state;
  }
}
