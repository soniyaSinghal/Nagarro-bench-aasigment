import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SettingsPageLayout from "./_Presentational/settingsPageLayout";
import * as userActions from "redux/actions/userActions";
import { useHistory } from "react-router-dom";
import { config } from "config/config";

function Settings(props) {
  let history = useHistory();
  let { actions, user } = props;
  let [userData, setUserData] = useState(user);
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [error, setError] = useState({
    nameError: false,
    emailError: false,
    passwordError: false,
    bioError: false
  });
  const userDetails = {
    username: "name",
    email: "email",
    password: "userPassword"
  };

  useEffect(() => {
    actions.getUserDetails();
  }, []);

  useEffect(() => {
    setUserData(props.user);
  }, [props.user]);

  const inputBoxChangeHandler = e => {
    // let tempData = userData;
    // tempData[e.target.name] = e.target.value;
    // setUserData(tempData => ({
    //   ...tempData
    // }));
    // setUserData(prevUserData => ({
    //   ...prevUserData,
    //   [name]: name === "authorId" ? parseInt(value, 10) : value
    // }));
    // if (e.target.name === userDetails.username) {
    //   setNameValue(e.target.value);
    //   setError({ nameError: false });
    // } else if (e.target.name === userDetails.email) {
    //   setEmailValue(e.target.value);
    //   setError({ emailError: false });
    // } else if (e.target.name === userDetails.password) {
    //   setPasswordValue(e.target.value);
    //   setError({ passwordError: false });
    // }
  };

  // const isValidForm = () => {
  //   if (nameValue.length === 0) {
  //     setError({ nameError: true });
  //     return false;
  //   } else if (emailValue.length === 0) {
  //     setError({ emailError: true });
  //     return false;
  //   } else if (passwordValue.length < 8) {
  //     setError({ passwordError: true });
  //     return false;
  //   }
  //   return true;
  // };

  const updateUserHandler = () => {
    // if (!isValidForm()) {
    //   return false;
    // }
    // userDetails.username = nameValue;
    // userDetails.email = emailValue;
    // userDetails.password = passwordValue;
    // actions.updateUser({ user: userDetails }).then(() => {
    //   history.push(config.HOME_PAGE_URI);
    // });
  };

  const logoutHandler = () => {
    actions.logoutUser();
    history.push(config.HOME_PAGE_URI);
  };

  return (
    <div className="authentication register">
      <SettingsPageLayout
        onChange={inputBoxChangeHandler}
        updateUser={updateUserHandler}
        user={user}
        error={error}
        logout={logoutHandler}
        userDetails={userDetails}
      />
    </div>
  );
}

Settings.propTypes = {
  loading: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    user: state.user,
    loading: state.apiCallsInProgress > 0
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getUserDetails: bindActionCreators(userActions.getUserDetails, dispatch),
      logoutUser: bindActionCreators(userActions.logoutUser, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
