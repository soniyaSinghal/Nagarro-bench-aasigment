import React from "react";
import PropTypes from "prop-types";
import { faStar, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { config } from "config/config";
import moment from "moment";

function Card({ article, deleteArticle, toggleArticleStatus, favLoading }) {
  let history = useHistory();
  let userDetails = JSON.parse(localStorage.getItem("userDetails"));
  let loggedInUsername =
    userDetails && userDetails.username ? userDetails.username : "";
  return (
    <div
      className={`card-container ${loggedInUsername ? "" : "disabled"}`}
      onClick={event => {
        event.stopPropagation();
        if (loggedInUsername) {
          history.push(`${config.ARTICLES_PAGE_URI}/${article.slug}`);
        } else {
          event.preventDefault();
        }
      }}
    >
      <div className="card-header-container">
        <div className="image-container">
          <img src={article.author.image} className="author-image" alt=" " />
        </div>
        <div className="text-container">
          <p className="name">{article.author.username}</p>
          <p className="date">
            {moment(article.updatedAt).format("MMMM DD,YYYY")}
          </p>
        </div>
        <div className="card-header-right-section">
          {loggedInUsername === article.author.username && (
            <>
              <div
                className="action-item-container"
                onClick={event => {
                  event.stopPropagation();
                  history.push(
                    `${config.ARTICLE_EDIT_PAGE_URI}/${article.slug}`
                  );
                }}
              >
                <FontAwesomeIcon icon={faEdit} className="edit-icon" />
              </div>
              <div
                className="action-item-container delete-icon-container"
                onClick={e => {
                  e.stopPropagation();
                  deleteArticle(article.slug);
                }}
              >
                <FontAwesomeIcon icon={faTrash} className="delete-icon" />
              </div>
            </>
          )}
          <div
            className={`action-item-container ${favLoading ? "no-action" : ""}`}
            onClick={event => {
              event.stopPropagation();
              toggleArticleStatus(article);
            }}
          >
            <FontAwesomeIcon icon={faStar} className="star-icon" />
            {article.favoritesCount}
          </div>
        </div>
      </div>
      <div className="card-body-container">
        <div className="article-name">{article.title}</div>
        <div className="article-description">{article.body}</div>
      </div>
      <div className="card-footer-container">
        {article.tagList.length ? (
          article.tagList.map(tag => {
            return (
              <span
                key={tag}
                className="tag-name"
                onClick={event => {
                  event.stopPropagation();
                  if (loggedInUsername) {
                    history.push(config.TAGGED_ARTICLE_PAGE_URL, {
                      tagName: tag
                    });
                  } else {
                    event.preventDefault();
                  }
                }}
              >
                {tag}
              </span>
            );
          })
        ) : (
          <span className="no-tag">No Tags are associated</span>
        )}
      </div>
    </div>
  );
}

Card.propTypes = {
  articlesData: PropTypes.object,
  deleteArticle: PropTypes.func.isRequired,
  toggleArticleStatus: PropTypes.func.isRequired,
  favLoading: PropTypes.bool.isRequired
};

export default Card;
