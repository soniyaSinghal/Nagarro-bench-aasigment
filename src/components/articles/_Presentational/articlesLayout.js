import React from "react";
import PropTypes from "prop-types";
import Card from "./cards/card";
import CardSkeleton from "./cards/cardSkeleton";

import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ArticlesLayout = ({
  articlesData,
  loading,
  deleteArticle,
  toggleArticleStatus,
  favLoading
}) => {
  return (
    <div className="article-page-layout">
      {!loading ? (
        <>
          {articlesData.articles.length ? (
            articlesData.articles.map((article, key) => {
              return (
                <Card
                  article={article}
                  key={key}
                  deleteArticle={deleteArticle}
                  toggleArticleStatus={toggleArticleStatus}
                  favLoading={favLoading}
                />
              );
            })
          ) : (
            <div className="nothing-container">
              <FontAwesomeIcon
                icon={faCalendarPlus}
                className="calendar-icon"
              />
              <p className="add-data-text">Add some Data</p>
            </div>
          )}
        </>
      ) : (
        <>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </>
      )}
    </div>
  );
};

ArticlesLayout.propTypes = {
  articlesData: PropTypes.object,
  loading: PropTypes.bool,
  deleteArticle: PropTypes.func,
  toggleArticleStatus: PropTypes.func.isRequired,
  favLoading: PropTypes.bool.isRequired
};

export default ArticlesLayout;
