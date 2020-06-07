import React, { useState } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../store/actions/authActions";

const Register = ({ errors, user, loginUser, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

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
      <form action="" className="card p-3 mx-auto col-md-6" onSubmit={onSubmit}>
        <h2 className="text-center">Вход</h2>

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

        <button type="submit" className="btn btn-primary btn-lg">
          Войти
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

export default connect(mapStateToProps, { registerUser })(Register);
