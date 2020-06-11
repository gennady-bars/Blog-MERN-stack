import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddComment = ({ user }) => {
  const [text, setText] = useState("");

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
    <form>
      <div className="form-group mt-3">
        <label htmlFor="text">Комментарий</label>
        <textarea
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Отправить
      </button>
    </form>
  );
};

export default AddComment;
