import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoginPageLayout from "./_Presentational/loginPageLayout";
import * as userActions from "redux/actions/userActions";
import { useHistory } from "react-router-dom";
import { config } from "config/config";

function Login(props) {
  let history = useHistory();

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [error, setError] = useState({
    emailError: false,
    passwordError: false
  });
  const userDetails = {
    email: "email",
    password: "password"
  };

  let { actions } = props;

  const inputBoxChangeHandler = e => {
    if (e.target.name === userDetails.email) {
      setEmailValue(e.target.value);
      setError({ emailError: false });
    } else if (e.target.name === userDetails.password) {
      setPasswordValue(e.target.value);
      setError({ passwordError: false });
    }
  };

  const isValidForm = () => {
    if (emailValue.length === 0) {
      setError({ emailError: true });
      return false;
    } else if (passwordValue.length < 8) {
      setError({ passwordError: true });
      return false;
    }
    return true;
  };

  const loginUserHandler = () => {
    if (!isValidForm()) {
      return false;
    }
    userDetails.email = emailValue;
    userDetails.password = passwordValue;
    actions.loginUser({ user: userDetails }).then(() => {
      history.push(config.HOME_PAGE_URI);
    });
  };

  return (
    <div className="authentication login">
      <LoginPageLayout
        onChange={inputBoxChangeHandler}
        loginUser={loginUserHandler}
        userDetails={userDetails}
        error={error}
      />
    </div>
  );
}

Login.propTypes = {
  loading: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    loading: state.apiCallsInProgress > 0
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loginUser: bindActionCreators(userActions.loginUser, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
