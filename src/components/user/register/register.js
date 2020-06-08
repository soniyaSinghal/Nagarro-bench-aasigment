import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import RegisterPageLayout from "./_Presentational/registerPageLayout";
import * as userActions from "redux/actions/userActions";
import { useHistory } from "react-router-dom";
import { config } from "config/config";
function Register(props) {
  let history = useHistory();

  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [error, setError] = useState({
    nameError: false,
    emailError: false,
    passwordError: false
  });
  const userDetails = {
    username: "username",
    email: "email",
    password: "password"
  };

  let { actions } = props;

  const inputBoxChangeHandler = e => {
    if (e.target.name === userDetails.username) {
      setNameValue(e.target.value);
      setError({ nameError: false });
    } else if (e.target.name === userDetails.email) {
      setEmailValue(e.target.value);
      setError({ emailError: false });
    } else if (e.target.name === userDetails.password) {
      setPasswordValue(e.target.value);
      setError({ passwordError: false });
    }
  };

  const isValidForm = () => {
    if (nameValue.length === 0) {
      setError({ nameError: true });
      return false;
    } else if (emailValue.length === 0) {
      setError({ emailError: true });
      return false;
    } else if (passwordValue.length < 8) {
      setError({ passwordError: true });
      return false;
    }
    return true;
  };

  const registerUserHandler = () => {
    if (!isValidForm()) {
      return false;
    }
    userDetails.username = nameValue;
    userDetails.email = emailValue;
    userDetails.password = passwordValue;
    actions.registerUser({ user: userDetails }).then(() => {
      history.push(config.HOME_PAGE_URI);
    });
  };

  return (
    <div className="authentication register">
      <RegisterPageLayout
        onChange={inputBoxChangeHandler}
        registerUser={registerUserHandler}
        userDetails={userDetails}
        error={error}
      />
    </div>
  );
}

Register.propTypes = {
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
      registerUser: bindActionCreators(userActions.registerUser, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
