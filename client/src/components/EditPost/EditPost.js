import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { editPostThunk, getPost } from "../../store/actions/postActions";
import { Link } from "react-router-dom";

const EditPost = ({ post, getPost, editPostThunk, error, history, match }) => {
  const [title, setTitle] = useState((post && post.title) || "");
  const [text, setText] = useState((post && post.text) || "");

  useEffect(() => {
    getPost(match.params.id);
    // eslint-disable-next-line
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const id = match.params.id;
    editPostThunk(id, { title, text }, history);
  };

  if (error) {
    return (
      <div>
        <h2>Ошибка</h2>
        <Link to='/' >Перейдите на главную страницу</Link>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="title">Заголовок</label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          value={title}
          className="form-control"
          name="title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="text">Содержание</label>
        <textarea
          onChange={(e) => setText(e.target.value)}
          type="text"
          value={text}
          className="form-control"
          name="text"
        />
      </div>

      <button type="submit" className="btn btn-primary mr-3">
        Редакторовать
      </button>
      <Link to="/" type="submit" className="btn btn-secondary">
        Отмена
      </Link>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    post: state.postReducer.post,
    error: state.postReducer.error,
  };
};

export default connect(mapStateToProps, { editPostThunk, getPost })(EditPost);
