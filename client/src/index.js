import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import js_cookie from "js-cookie";
import jwt_decode from "jwt-decode";
import * as serviceWorker from "./serviceWorker";
import App from "./components/App";
import store from "./store/store";
import { setUser, logoutUser } from "./store/actions/authActions";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

const jwt = js_cookie.get("jwt");

if (jwt) {
  const decoded = jwt_decode(jwt);
  store.dispatch(setUser(decoded));

  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
