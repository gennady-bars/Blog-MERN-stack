import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

const AddComment = ({ user, addComment, match }) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault()
    addComment(match.params.id, { text })
    setText('')
  }

  if (!user) {
    return (
      <div>
        <p>
          Комментировать могут только зарегистрированные пользователи <br />
          <Link to="/login">Войти</Link> или{" "}
          <Link to="/register">Зарегистрироваться</Link>
        </p>
      </div>
    );
  }
  return (
    <form onSubmit={onSubmit} >
      <div className="form-group mt-3">
        <label htmlFor="text">Комментарий</label>
        <textarea
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary mb-3" disabled={!text.trim()}>
        Отправить
      </button>
    </form>
  );
};

export default withRouter(AddComment);
