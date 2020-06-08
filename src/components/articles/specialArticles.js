import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as specialArticleActions from "redux/actions/specialArticleActions";
import { handleError } from "api/apiUtils";
import ArticlesLayout from "./_Presentational/articlesLayout";
import { Button } from "react-bootstrap";

const SpecialArticle = ({
  articlesData,
  loading,
  loadMyFavArticles,
  markMyArticleUnFav,
  deleteMyFavArticle,
  isFav,
  isTagAssociated,
  loadSpecialArticles,
  tagName,
  markArticleFav,
  markSpecialArticleUnFav
}) => {
  let [currentPageNumber, setCurrentPageNumber] = useState(1);
  let articleLimit = 10;
  let userDetails = JSON.parse(localStorage.getItem("userDetails"));
  let loggedInUsername =
    userDetails && userDetails.username ? userDetails.username : "";
  let initialArticleOffset = 0;

  /**
   * @description React life cycle method
   */
  useEffect(() => {
    let articleOffset = 0;
    loadSpecialArticlesList(articleOffset);
  }, [tagName]);

  /**
   *
   * @param {Boolean} articleOffset
   * @description  Method will dispatch an action to get the article list
   */
  let loadSpecialArticlesList = articleOffset => {
    if (isFav) {
      loadMyFavArticles(articleLimit, articleOffset, loggedInUsername).catch(
        error => {
          handleError("Something went wrong", error);
        }
      );
    } else if (isTagAssociated) {
      loadSpecialArticles(articleLimit, articleOffset, tagName);
    }
  };

  /**
   *
   * @param {Boolean} totalNumberOfItem
   * @description This method will return the markup for pagination
   */
  let getPaginationMarkup = totalNumberOfItem => {
    let paginationButtonsCount = totalNumberOfItem / articleLimit;
    let buttonMarkup = [];

    for (let i = 0; i < paginationButtonsCount; i++) {
      buttonMarkup.push(
        <Button
          variant="outline-success"
          className={currentPageNumber === i + 1 ? "selected" : ""}
          onClick={e => {
            setCurrentPageNumber(i + 1);
            e.stopPropagation();
            loadSpecialArticlesList(i * 10);
          }}
          value={i}
          key={i}
        >
          {i + 1}
        </Button>
      );
    }

    return buttonMarkup;
  };

  /**
   *
   * @param {Object} article
   * @description method will mark article fav/unFav
   */
  let toggleArticleStatusHandler = article => {
    if (article.favorited) {
      if (isFav) {
        markMyArticleUnFav(article);
      } else {
        markSpecialArticleUnFav(article);
      }
    } else {
      markArticleFav(article);
    }
  };

  /**
   *
   * @param {String} articleSlug
   * @description method will dispatch an action to delete article
   */
  let deleteArticleHandler = articleSlug => {
    deleteMyFavArticle(
      articleSlug,
      articleLimit,
      initialArticleOffset,
      loggedInUsername
    );
  };

  return (
    <div className="all-articles">
      {isTagAssociated && (
        <p className="page-heading">
          Showing Data for Tag: <span className="name">{tagName}</span>{" "}
        </p>
      )}
      <ArticlesLayout
        articlesData={articlesData}
        loading={loading}
        deleteArticle={deleteArticleHandler}
        toggleArticleStatus={toggleArticleStatusHandler}
        favLoading={false}
      />
      <div className="pagination-container">
        {getPaginationMarkup(articlesData.articlesCount)}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    articlesData: state.specialArticles,
    loading: state.apiCallsInProgress > 0,
    favLoading: state.favApiCallsInProgress > 0
  };
};

let mapDispatchToProps = {
  loadMyFavArticles: specialArticleActions.loadMyFavArticles,
  markMyArticleUnFav: specialArticleActions.markMyArticleUnFav,
  deleteMyFavArticle: specialArticleActions.deleteMyFavArticle,
  loadSpecialArticles: specialArticleActions.loadSpecialArticles,
  markArticleFav: specialArticleActions.markArticleFav,
  markSpecialArticleUnFav: specialArticleActions.markSpecialArticleUnFav
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialArticle);
