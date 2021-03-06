import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getPost,
  deletePostThunk,
  addCommentThunk,
} from "../../store/actions/postActions";
import Spinner from "../Spinner/Spinner";
import { Link } from "react-router-dom";
import AddComment from "../AddComment/AddComment";
import Comments from "../Comments/Comments";
import { Helmet } from "react-helmet";

const PostDetails = ({
  post,
  user,
  getPost,
  deletePostThunk,
  addCommentThunk,
  history,
  match,
}) => {
  useEffect(() => {
    getPost(match.params.id);
    // eslint-disable-next-line
  }, []);

  const onDelete = () => {
    const confirmed = window.confirm("Удалить пост?");
    if (confirmed) {
      deletePostThunk(post._id, history);
    }
  };

  if (!post) return <Spinner />;

  return (
    <div>
      <Helmet>
        <title>{post.title}</title>
      </Helmet>
      <h1>{post.title}</h1>

      <p className="text-muted">{post.author.name}</p>

      <p>{post.text}</p>

      {user && user.id === post.author._id ? (
        <div>
          <button onClick={onDelete} className="btn btn-danger mr-2">
            Удалить
          </button>
          <Link to={`/edit/${post._id}`} className="btn btn-light mr-2">
            Редактировать
          </Link>
        </div>
      ) : null}

      <AddComment user={user} addComment={addCommentThunk} />

      <Comments comments={post.comments} />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    post: state.postReducer.post,
    user: state.authReducer.user,
  };
}

export default connect(mapStateToProps, {
  getPost,
  deletePostThunk,
  addCommentThunk,
})(PostDetails);
