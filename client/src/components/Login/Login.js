import React, { useState } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../store/actions/authActions";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    props.loginUser({email, password})
  };
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
  };
};

export default connect(mapStateToProps, { loginUser })(Login);
