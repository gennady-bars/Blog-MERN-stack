import React from 'react'
import { Link } from 'react-router-dom'

const Post = ({post}) => {
  const shortenText = (text) => {
    if (text) {
      return text.length > 100? text.substring(0, 100) + '...' : text
    }
  }
    return (
        <div className='card mb-3'>
            <div className="card-body">
                <h1>{post.title}</h1>
                <p>{shortenText(post.text)}</p>
                <Link to={`/post/${post._id}`} className='btn btn-primary' >Подробнее</Link>
            </div>
        </div>
    )
}

export default Post;