import React from 'react'

const Comment = ({comment, user}) => {
    return (
        <div className='card'>
          <div className="card-body">
            <h4>{comment.author.name}</h4>
            <p>{comment.text}</p>
            {
              user && (user.id === comment.author._id) && (
                <button className='btn btn-danger' >Удалить</button>
              )
            }
          </div>
        </div>
    )
}

export default Comment;