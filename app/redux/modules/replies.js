import { postReply, fetchReplies } from 'helpers/api'

const FETCHING_REPLIES = 'FETCHING_REPLIES'
const FETCHING_REPLIES_ERROR = 'FETCHING_REPLIES_ERROR'
const FETCHING_REPLIES_SUCCESS = 'FETCHING_REPLIES_SUCCESS'
const ADD_REPLY = 'ADD_REPLY'
const ADD_REPLY_ERROR = 'ADD_REPLY_ERROR'
const REMOVE_REPLY = 'REMOVE_REPLY'


function fetchingReplies() {
  return {
    type: FETCHING_REPLIES
  }
}

function fetchingRepliesError (error) {
  console.warn(error)
  return {
    type: FETCHING_REPLIES_ERROR,
    error: 'Error fetching replies',
  }
}

function fetchingRepliesSuccess(replies, duckId) {
  return {
    type: FETCHING_REPLIES_SUCCESS,
    replies,
    duckId,
    lastUpdated: Date.now(),
  }
}

function addReply (duckId, reply) {
  return {
    type: ADD_REPLY,
    duckId,
    reply,
  }
}

function addReplyError (error) {
  console.warn(error)
  return {
    type: ADD_REPLY_ERROR,
    error: 'Error adding reply',
  }
}

function removeReply(duckId, replyId) {
  return {
    type: REMOVE_REPLY,
    duckId,
    replyId,
  }
}

export function addAndHandleReply (duckId, reply) {
  return function (dispatch) {
    const { replyWithId, replyPromise } = postReply(duckId, reply)

    dispatch(addReply(duckId, replyWithId))
    replyPromise.catch((error) => {
      dispatch(removeReply(duckId, replyWithId.replyId))
      dispatch(addReplyError(error))
    })
  }
}

export function fetchAndHandleReplies (duckId) {
  return function (dispatch) {
    dispatch(fetchingReplies())

    fetchReplies(duckId)
      .then((replies) => dispatch(fetchingRepliesSuccess(replies, duckId)))
      .catch((error) => dispatch(fetchingRepliesError(error)))
  }
}

// Reducers
const initialReply = {
  name:'',
  reply: '',
  uid: '',
  timestamp: 0,
  avatar:'',
}

function duckReplies(state=initialReply, action) {
  switch (action.type) {
    case ADD_REPLY:
      return {
        ...state,
        [action.reply.replyId]: action.reply,
      }
    case REMOVE_REPLY:
      return {
        ...state,
        [action.reply.replyId]: undefined,
      }
      return
    default:
      return state
  }
}

const initialDuckState = {
  lastUpdated: Date.now(),
  replies: {},
}

function repliesAndLastUpdate(state=initialDuckState, action) {
  switch (action.type) {

    case FETCHING_REPLIES_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        replies: action.replies,
      }
    case ADD_REPLY:
    case REMOVE_REPLY:
      return {
        ...state,
        replies: duckReplies(state.replies, action)
      }
    default:
      return state
  }
}

const initialState = {
  isFetching: false,
  error: '',
}

export default function replies(state=initialState, action) {
  switch (action.type) {
    case FETCHING_REPLIES:
      return {
        ...state,
        isFetching: true,
      }
    case ADD_REPLY_ERROR:
    case FETCHING_REPLIES_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case ADD_REPLY:
    case FETCHING_REPLIES_SUCCESS:
    case REMOVE_REPLY:
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.duckId]: repliesAndLastUpdate(state[action.duckId], action)
      }
    default:
      return state
  }
}
