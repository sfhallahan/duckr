import { ADD_LIKE, REMOVE_LIKE } from './usersLikes'
import { fetchLikeCount } from 'helpers/api'
const FETCHING_COUNT = 'FETCHING_COUNT'
const FETCHING_COUNT_ERROR = 'FETCHING_COUNT_ERROR'
const FETCHING_COUNT_SUCCESS = 'FETCHING_COUNT_SUCCESS'
import { Map } from 'immutable'

// Like count Action Creators

function fetchingCount() {
  return {
    type: FETCHING_COUNT
  }
}

function fetchingCountError(error) {
  console.warn(error)
  return {
    type: FETCHING_COUNT_ERROR,
    error: 'Error fetching duck\'s like count'
  }
}

function fetchingCountSuccess(duckId, count) {
  return {
    type: FETCHING_COUNT_SUCCESS,
    duckId,
    count,
  }
}


export function initLikeFetch(duckId) {
  return function (dispatch) {
    dispatch(fetchingCount())
    fetchLikeCount(duckId)
      .then((count) => dispatch(fetchingCountSuccess(duckId, count)))
      .catch((error) => dispatch(fetchingCountError(error)))

  }
}

// Like count Reducers



function count(state=0, action) {
  switch (action.type) {
    case ADD_LIKE:
      return state + 1
    case REMOVE_LIKE:
      return state - 1
    default:
      return state
  }
}

const initialState = Map({
  isFetching: false,
  error: '',
})

export default function likeCount (state = initialState, action) {
  switch (action.type) {
    case FETCHING_COUNT:
      return state.merge({
        isFetching: true,
      })
    case FETCHING_COUNT_ERROR:
      return state.merge({
        isFetching: false,
        error: action.error,
      })
    case FETCHING_COUNT_SUCCESS:
      return state.merge({
        isFetching: false,
        error: '',
        [action.duckId]: action.count,
      })
    case ADD_LIKE:
    case REMOVE_LIKE:
      return typeof state.get(action.duckId) === 'undefined'
        ? state
        : state.merge({
          [action.duckId]: count(state.get(action.duckId), action)
        })
    default:
      return state
  }
}
