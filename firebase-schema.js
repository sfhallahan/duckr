/* Notes
  - There's no such thing as perfect
    - There will be tradeoffs, just keep that in mind
  -Keep data shallow
  - Repeating data is OK
*/

/users
  uid 
   name
   uid
   avatar

/ducks
  duckId
    avatar
    duckId
    name
    text
    timestamp
    uid

/likeCount
  duckId

/usersDucks
  uid
    duckId

/replies
  duckId
    replyId
      name
      comment
      uid
      timestamp
      avatar
/usersLikes
  uid
    duckId
