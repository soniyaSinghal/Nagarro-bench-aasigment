import React from "react";
import PropTypes from "prop-types";
import HeaderLayout from "./_Presentational/HeaderLayout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import { config } from "config/config";
import * as userActions from "redux/actions/userActions";

function Header(props) {
  let { user, actions } = props;
  let history = useHistory();

  /**
   * @description This method will dispatch an action to logout
   */
  const logoutHandler = () => {
    actions.logoutUser();
    history.push(config.HOME_PAGE_URI);
  };
  return <HeaderLayout user={user} logout={logoutHandler} />;
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

Header.propTypes = {
  user: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      logoutUser: bindActionCreators(userActions.logoutUser, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
