import React from 'react'

const Comment = ({comment}) => {
    return (
        <div className='card'>
          <div className="card-body">
            <h4>{comment.author.name}</h4>
            <p>{comment.text}</p>
            <button className='btn btn-danger' >Удалить</button>
          </div>
        </div>
    )
}

export default Comment;