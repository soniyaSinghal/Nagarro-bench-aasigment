import React, { useState } from "react";
import {
  faEdit,
  faStar,
  faUser,
  faBars,
  faHome,
  faSignOutAlt,
  faNewspaper
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { config } from "config/config";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SlidingPane from "react-sliding-pane";

export default function SidePanel({ user, logout }) {
  let location = useLocation();
  let userDataFromWebStorage = JSON.parse(localStorage.getItem("userDetails"));
  let userDetails = userDataFromWebStorage ? userDataFromWebStorage : user;
  let [sideBarOpened, setSideBarOpened] = useState(false);
  return (
    <>
      <span
        onClick={() => {
          setSideBarOpened(true);
        }}
      >
        <FontAwesomeIcon className="menu-icon" icon={faBars} />
      </span>

      <SlidingPane
        closeIcon={<></>}
        isOpen={sideBarOpened}
        title={userDetails.username}
        from="left"
        width="25rem"
        onRequestClose={() => setSideBarOpened(false)}
      >
        <div
          className="side-bar-link-container"
          onClick={() => {
            setSideBarOpened(false);
          }}
        >
          <Link
            className={`${
              location.pathname === config.HOME_PAGE_URI
                ? "side-bar-text"
                : "side-bar-text-lighter"
            }`}
            to={config.HOME_PAGE_URI}
          >
            <FontAwesomeIcon className="action-icons" icon={faHome} />
            Home
          </Link>
        </div>
        <div
          className="side-bar-link-container"
          onClick={() => {
            setSideBarOpened(false);
          }}
        >
          <Link
            className={`${
              location.pathname === config.ARTICLE_ADD_PAGE_URI
                ? "side-bar-text"
                : "side-bar-text-lighter"
            }`}
            to={config.ARTICLE_ADD_PAGE_URI}
          >
            <FontAwesomeIcon className="action-icons" icon={faEdit} />
            New Article
          </Link>
        </div>
        <div
          className="side-bar-link-container"
          onClick={() => {
            setSideBarOpened(false);
          }}
        >
          <Link
            className={`${
              location.pathname === config.ARTICLES_PAGE_URI
                ? "side-bar-text"
                : "side-bar-text-lighter"
            }`}
            to={config.ARTICLES_PAGE_URI}
          >
            <FontAwesomeIcon className="action-icons" icon={faNewspaper} />
            All Articles
          </Link>
        </div>
        <div
          className="side-bar-link-container"
          onClick={() => {
            setSideBarOpened(false);
          }}
        >
          <Link
            className={`${
              location.pathname === config.FAV_ARTICLE_PAGE_URL
                ? "side-bar-text"
                : "side-bar-text-lighter"
            }`}
            to={config.FAV_ARTICLE_PAGE_URL}
          >
            <FontAwesomeIcon className="action-icons" icon={faStar} />
            My Favorites
          </Link>
        </div>
        <div
          className="side-bar-link-container"
          onClick={() => {
            setSideBarOpened(false);
          }}
        >
          <Link
            className={`${
              location.pathname === config.MY_ARTICLES_PAGE_URI
                ? "side-bar-text"
                : "side-bar-text-lighter"
            }`}
            to={config.MY_ARTICLES_PAGE_URI}
          >
            <FontAwesomeIcon className="action-icons" icon={faUser} />
            My Articles
          </Link>
        </div>

        <div
          className="side-bar-link-container"
          onClick={() => {
            setSideBarOpened(false);
          }}
        >
          <div onClick={logout} className="side-bar-text-lighter">
            <FontAwesomeIcon icon={faSignOutAlt} className="action-icons" />{" "}
            Logout
          </div>
        </div>
      </SlidingPane>
    </>
  );
}
SidePanel.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};
