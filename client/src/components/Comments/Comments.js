import React from 'react'
import Comment from '../Comment.js/Comment';

const Comments = ({comments, user}) => {

  if (comments.length === 0) {
    return <p>Список комментариев пока пуст</p>
  }
    return (
        <div>
          {
            comments.map((comment) => {
              return <Comment key={comment._id} comment={comment} user={user} />
            })
          }
        </div>
    )
}

export default Comments;