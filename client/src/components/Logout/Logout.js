import React, { useEffect } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../store/actions/authActions";

const Logout = ({ logoutUser, history }) => {
  useEffect(() => {
    logoutUser();
    history.replace("/login");
    // eslint-disable-next-line
  }, []);
  return <div></div>;
};

export default connect(null, { logoutUser })(Logout);
