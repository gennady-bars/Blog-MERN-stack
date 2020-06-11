import React, { useState } from "react";
import { connect } from "react-redux";
import { addPostThunk } from "../../store/actions/postActions";
import { Link } from "react-router-dom";
import withAuth from "../../hoc/withAuth";

const AddPost = ({ addPostThunk, history }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    addPostThunk({ title, text }, history);
  };
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
        Опубликовать
      </button>
      <Link to='/' type="submit" className="btn btn-secondary">
        Отмена
      </Link>
    </form>
  );
};

export default withAuth(connect(null, { addPostThunk })(AddPost))
