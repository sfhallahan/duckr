// What is the minimal representation of our app state, as an object

{
  users: {
    isAuthed,
    isFetching,
    error,
    authedId,
    [uid] : {
      lastUpdated,
      info: {
        name,
        uid
        avatar
      }
    }
  },
  modal: {
    duckText,
    isOpen
  },
  ducks: {
    isFetching,
    error,
    [duckId]: {
      lastUpdated,
      info: {
        avatar
        duckId
        name
        text
        timestamp
        uid
      }
    }
  },
  usersDucks: {
    isFetching,
    error,
    [uid]: {
      lastUpdated,
      duckIds: [duckId, duckId, duckId]
    }
  },
  likeCount: {
    isFetching,
    error,
    [duckId]: 0
  },
  userlikes: {
    isFetching,
    error,
    [duckId]: true
  },
  replies: {
    isFetching,
    error,
    [duckId]: {
      lastUpdated,
      replies: {
        [replyId]: {
          name
          reply
          uid
          timestamp
          avatar
        }
      }
    }
  },
  listeners: {
    [listenerId]: true;
  },
  feed: {
    isFetching,
    error,
    newDucksAvailable,
    newDucksToAdd: [duckId, duckId]
    duckIds: [duckId, duckId, duckId]
  }
}
