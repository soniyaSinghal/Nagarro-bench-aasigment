import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserData, updateUserDetails } from "redux/actions/userActions";
import SettingsPageLayout from "./_Presentational/settingsPageLayout";
import { toast } from "react-toastify";

export const Settings = ({
  getUserData,
  loading,
  updateUserDetails,
  ...props
}) => {
  let { userData } = props;

  let [userDetails, setUserDetails] = useState({ userData });
  let [formError, setFormError] = useState({});

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    setUserDetails(userData);
  }, [userData]);

  let onChangeHandler = event => {
    const { name, value } = event.target;
    if (name === "email") {
      return;
    }
    setFormError(preError => {
      return {
        ...preError,
        [name]: !Boolean(value)
      };
    });
    if (name === "password") {
      setUserDetails(prevUserDetails => {
        return {
          ...prevUserDetails,
          password: value
        };
      });
      setFormError(preError => {
        return {
          ...preError,
          password: !Boolean(value)
        };
      });
    } else {
      setUserDetails(prevUserDetails => {
        return {
          ...prevUserDetails,
          [name]: value
        };
      });
      setFormError(preError => {
        return {
          ...preError,
          [name]: !Boolean(value)
        };
      });
    }
  };

  let isValid = userDetails => {
    let errorMap = {};

    if (!userDetails.username) {
      errorMap.username = true;
    }
    if (!userDetails.password) {
      errorMap.password = true;
    }
    setFormError(errorMap);
    return !Boolean(Object.keys(errorMap).length);
  };

  let UpdateUserDetailsHandler = () => {
    if (!isValid(userDetails)) {
      return;
    }
    let dataToBePost = {
      user: {
        bio: userDetails.bio,
        email: userDetails.email,
        image: userDetails.image,
        password: userDetails.password,
        username: userDetails.username
      }
    };
    updateUserDetails(dataToBePost).then(() => {
      toast.success("Your settings has updated");
    });
  };
  return (
    <SettingsPageLayout
      userDetails={userDetails}
      onChange={onChangeHandler}
      formError={formError}
      pageHeading="Your Settings"
      loading={loading}
      UpdateUserDetails={UpdateUserDetailsHandler}
    />
  );
};

Settings.propTypes = {
  userData: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    userData: state.user ? state.user : {},
    loading: state.apiCallsInProgress > 0
  };
};

const mapDispatchToProps = {
  getUserData,
  updateUserDetails
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
