import React from "react";
import PropTypes from "prop-types";
import { withRouter, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { config } from "config/config";
import { faEdit, faSortDown, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HeaderLayout = ({ user, logout }) => {
  let location = useLocation();
  let userDataFromWebStorage = JSON.parse(localStorage.getItem("userDetails"));
  let userDetails = userDataFromWebStorage ? userDataFromWebStorage : user;
  return (
    <header className="page_header">
      <div className="page_header_container-1">
        <Link
          to={config.HOME_PAGE_URI}
          className="page_header_container-1_logo"
        >
          Portal
        </Link>
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
          {userDetails.id ? (
            <>
              <Link
                className={`${
                  location.pathname === config.ARTICLE_ADD_PAGE_URI
                    ? "page_header_container-1_action_text"
                    : "page_header_container-1_action_text-lighter"
                }`}
                to={config.ARTICLE_ADD_PAGE_URI}
              >
                <FontAwesomeIcon icon={faEdit} />
                New Article
              </Link>
              <Link
                className={`${
                  location.pathname === config.FAV_ARTICLE_PAGE_URL
                    ? "page_header_container-1_action_text"
                    : "page_header_container-1_action_text-lighter"
                }`}
                to={config.FAV_ARTICLE_PAGE_URL}
              >
                <FontAwesomeIcon icon={faStar} />
                My Favorites
              </Link>

              <span className="page_header_container-1_action_text-lighter show-drop-down">
                {userDetails.username}
                <FontAwesomeIcon icon={faSortDown} />
                <ul className="dropdown-list">
                  <li onClick={logout}>Logout</li>
                </ul>
              </span>
            </>
          ) : (
            <>
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
            </>
          )}
        </span>
      </div>
    </header>
  );
};

HeaderLayout.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

export default withRouter(HeaderLayout);
