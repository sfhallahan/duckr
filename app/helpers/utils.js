import {
  usersDucksExpirationLength,
  usersExpirationLength,
  repliesExpirationLength
} from "config/constants";

export function formatUserInfo(name, avatar, uid) {
  return {
    name,
    avatar,
    uid
  };
}

export function formatDuck(text, user) {
  return {
    text,
    name: user.get("name"),
    avatar: user.get("avatar"),
    uid: user.get("uid"),
    timestamp: Date.now()
  };
}

export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

function getMilliseconds(timestamp) {
  return Date.now() - new Date(timestamp).getTime();
}

export function staleUser(timestamp) {
  return getMilliseconds(timestamp) > usersExpirationLength;
}

export function staleDucks(timestamp) {
  return getMilliseconds(timestamp) > usersDucksExpirationLength;
}

export function formatReply(authedUser, reply) {
  return {
    name: authedUser.get("name"),
    reply,
    uid: authedUser.get("uid"),
    avatar: authedUser.get("avatar"),
    timestamp: Date.now()
  };
}

export function staleReplies(timestamp) {
  return getMilliseconds(timestamp) > repliesExpirationLength;
}
