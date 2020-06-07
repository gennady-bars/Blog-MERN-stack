import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-3">
      <div className="container">
        <Link to="/" className="navbar-brand">
          React Blog
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to='/add' className='nav-link' >Добавить статью</Link>
            </li>
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to='/login' className='nav-link' >Вход</Link>
            </li>
            <li className="nav-item">
              <Link to='/register' className='nav-link' >Регистрация</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
