import React, { useEffect } from "react";
import { connect } from "react-redux";

const withAuth = (Component) => {
  const RetunedComponent = (props) => {
    useEffect(() => {
      if (!props.user) {
        return props.history.push("/login");
      }
    });

    return <Component {...props} />;
  };

  const mapStateToProps = (state) => {
    return {
      user: state.authReducer.user,
    };
  };

  return connect(mapStateToProps)(RetunedComponent);
};

export default withAuth;
