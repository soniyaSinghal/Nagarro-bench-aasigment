import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faEdit } from "@fortawesome/free-solid-svg-icons";
import ReadArticleSkeleton from "./readArticleSkeleton";
import Comments from "components/comments/comments";
import { config } from "config/config";
import { Link } from "react-router-dom";

function ReadArticleLayout({ selectedArticle, loading, slug, toggleFav }) {
  let userDetails = JSON.parse(localStorage.getItem("userDetails"));
  let loggedInUsername =
    userDetails && userDetails.username ? userDetails.username : "";
  return (
    <>
      {loading ? (
        <ReadArticleSkeleton />
      ) : (
        <div className="read-article">
          <section className="banner">
            <p className="banner-title">{selectedArticle.title}</p>
            {selectedArticle.author && (
              <div>
                <img
                  src={selectedArticle.author.image}
                  alt="logo"
                  className="user-logo"
                />
                <div className="info">
                  <p className="name">{selectedArticle.author.username}</p>
                  <p className="date">
                    {moment(selectedArticle.updatedAt).format("MMMM DD,YYYY")}
                  </p>
                </div>

                <div className="fav" onClick={() => toggleFav(selectedArticle)}>
                  <FontAwesomeIcon icon={faStar} className="star-icon" />
                  {selectedArticle.favorited
                    ? "Mark Unfavorite Article "
                    : "Mark Favorite Article "}
                  {selectedArticle.favoritesCount}
                </div>
                {loggedInUsername === selectedArticle.author.username && (
                  <Link
                    to={`${config.ARTICLE_EDIT_PAGE_URI}/${selectedArticle.slug}`}
                    className="fav"
                  >
                    <FontAwesomeIcon icon={faEdit} className="star-icon" />
                    Edit Article
                  </Link>
                )}
              </div>
            )}
          </section>
          <section className="content-container">
            <label className="content-label">Description</label>
            <p className="article-text">{selectedArticle.description}</p>
            <label className="content-label">Tags</label>
            <div className="tags-container">
              {selectedArticle.tagList && selectedArticle.tagList.length ? (
                selectedArticle.tagList.map(tag => {
                  return (
                    <span className="tag-name" key={tag}>
                      {tag}
                    </span>
                  );
                })
              ) : (
                <p className="article-text">No tag is attached</p>
              )}
            </div>
          </section>
          <section className="comment-card-container">
            <Comments slug={slug} />
          </section>
        </div>
      )}
    </>
  );
}

ReadArticleLayout.propTypes = {
  loading: PropTypes.bool.isRequired,
  selectedArticle: PropTypes.object,
  toggleFav: PropTypes.func.isRequired
};

export default ReadArticleLayout;
