import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPost, deletePostThunk } from "../../store/actions/postActions";
import Spinner from "../Spinner/Spinner";

const PostPage = ({ post, user, getPost, deletePostThunk, history, match }) => {
  useEffect(() => {
    getPost(match.params.id);
    // eslint-disable-next-line
  }, []);

  if (!post) return <Spinner />;

  return (
    <div>
      <h1>{post.title}</h1>

      <p className="text-muted">{post.author.name}</p>

      <p>{post.text}</p>

      {user && user.id === post.author._id ? (
        <div>
          <button onClick={() => deletePostThunk(post._id, history)} className="btn btn-danger mr-2">Удалить</button>
          <button className="btn btn-light mr-2">Редактировать</button>
        </div>
      ) : null}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    post: state.postReducer.post,
    user: state.authReducer.user,
  };
}

export default connect(mapStateToProps, { getPost, deletePostThunk })(PostPage);
