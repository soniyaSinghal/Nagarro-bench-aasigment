import React from "react";
import PropTypes from "prop-types";
import { withRouter, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { config } from "config/config";
import SidePanel from "components/common/sidepanel/sidePanel";

const HeaderLayout = ({ user, logout }) => {
  let location = useLocation();
  let userDataFromWebStorage = JSON.parse(localStorage.getItem("userDetails"));
  let userDetails = userDataFromWebStorage ? userDataFromWebStorage : user;
  return (
    <header className={`page_header ${userDetails.id ? "logged-in-user" : ""}`}>
      <div className="page_header_container-1">
        {userDetails.id && <SidePanel user={user} logout={logout} />}

        <Link
          to={config.HOME_PAGE_URI}
          className="page_header_container-1_logo"
        >
          Portal
        </Link>
        {!userDetails.id && (
          <span className="page_header_container-1_action">
            <Link
              className={`${
                location.pathname === config.HOME_PAGE_URI
                  ? "page_header_container-1_action_text"
                  : "page_header_container-1_action_text-lighter"
              }`}
              to={config.HOME_PAGE_URI}
            >
              Home
            </Link>

            <Link
              className={`${
                location.pathname === config.LOGIN_PAGE_URI
                  ? "page_header_container-1_action_text"
                  : "page_header_container-1_action_text-lighter"
              }`}
              to={config.LOGIN_PAGE_URI}
            >
              Sign in
            </Link>
            <Link
              className={`${
                location.pathname === config.REGISTER_PAGE_URI
                  ? "page_header_container-1_action_text"
                  : "page_header_container-1_action_text-lighter"
              }`}
              to={config.REGISTER_PAGE_URI}
            >
              Sign up
            </Link>
          </span>
        )}
      </div>
    </header>
  );
};

HeaderLayout.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

export default withRouter(HeaderLayout);
