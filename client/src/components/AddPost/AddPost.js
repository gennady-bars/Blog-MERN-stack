import React, { useState } from "react";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(title, text);
    
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
          name='title'
        />
      </div>

      <div className="form-group">
        <label htmlFor="text">Содержание</label>
        <textarea
          onChange={(e) => setText(e.target.value)}
          type="text"
          value={text}
          className="form-control"
          name='text'
        />
      </div>

      <button type='submit' className="btn btn-primary">Опубликовать</button>
    </form>
  );
};

export default AddPost;
