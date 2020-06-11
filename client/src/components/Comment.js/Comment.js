import React from "react";
import { connect } from "react-redux";
import { deleteCommentThunk } from "../../store/actions/postActions";

const Comment = ({ comment, user, deleteCommentThunk }) => {
  const deleteComment = () => {
    const confirmed = window.confirm("Удалить комментарий?");
    
    if (confirmed) {
      deleteCommentThunk(comment._id);
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h4>{comment.author.name}</h4>
        <p>{comment.text}</p>
        {user && user.id === comment.author._id && (
          <button onClick={deleteComment} className="btn btn-danger">
            Удалить
          </button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
  };
};

export default connect(mapStateToProps, { deleteCommentThunk })(Comment);
