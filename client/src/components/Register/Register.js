import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { registerUser, clearErrors } from "../../store/actions/authActions";
import { Helmet } from "react-helmet";

const Register = ({ errors, user, registerUser, clearErrors, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  useEffect(() => {
    clearErrors();
    // eslint-disable-next-line
  }, []);

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    registerUser({ email, password, password2, name });
  };

  if (user) history.push("/");

  return (
    <div className="row">
      <Helmet>
        <title>Регистрация</title>
      </Helmet>
      <form action="" className="card p-3 mx-auto col-md-6" onSubmit={onSubmit}>
        <h2 className="text-center">Регистрация</h2>

        <div className="form-group">
          <label htmlFor="name">Имя</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
          />
          {errors.name && <div className="text-danger">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={onEmailChange}
            name="email"
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={onPasswordChange}
            name="password"
          />
          {errors.password && (
            <div className="text-danger">{errors.password}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password2">Повторите пароль</label>
          <input
            type="password"
            className="form-control"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            name="password2"
          />
          {errors.password2 && (
            <div className="text-danger">{errors.password2}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary btn-lg">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
    errors: state.authReducer.authErrors,
  };
};

export default connect(mapStateToProps, { registerUser, clearErrors })(
  Register
);
