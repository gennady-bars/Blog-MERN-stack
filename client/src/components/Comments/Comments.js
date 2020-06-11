import React from 'react'
import Comment from '../Comment.js/Comment';

const Comments = ({comments}) => {
    return (
        <div>
          {
            comments.map((comment) => {
              return <Comment key={comment._id} comment={comment} />
            })
          }
        </div>
    )
}

export default Comments;