import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as articleActions from "redux/actions/articleActions";
import { handleError } from "api/apiUtils";
import ArticlesLayout from "./_Presentational/articlesLayout";
import { Button } from "react-bootstrap";

function AllArticles(props) {
  let {
    articlesData,
    loading,
    deleteArticle,
    markArticleFav,
    markArticleUnFav,
    loadArticles,
    favLoading
  } = props;
  let [currentPageNumber, setCurrentPageNumber] = useState(1);
  let articleLimit = 10;
  let initialArticleOffset = 0;

  /**
   * @description React method
   */
  useEffect(() => {
    let articleOffset = 0;

    loadArticlesList(articleOffset);
  }, []);

  /**
   *
   * @param {Boolean} articleOffset
   * @description method will despatch an action to fetch the article details
   */
  let loadArticlesList = articleOffset => {
    loadArticles(articleLimit, articleOffset).catch(error => {
      handleError("Something went wrong", error);
    });
  };

  /**
   *
   * @param {String} articleSlug
   * @description This method will dispatch the action to delete the selected article
   */
  let deleteArticleHandler = articleSlug => {
    deleteArticle(articleSlug, articleLimit, initialArticleOffset);
  };

  /**
   *
   * @param {Boolean} totalNumberOfItem
   * @description This method will return markup for page pagination
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
            loadArticles(i * 10);
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
   * @description Method will dispatch the action to mark fav/unFav article
   */
  let toggleArticleStatusHandler = article => {
    if (article.favorited) {
      markArticleUnFav(article);
    } else {
      markArticleFav(article);
    }
  };

  return (
    <div className="all-articles">
      <ArticlesLayout
        articlesData={articlesData}
        loading={loading}
        deleteArticle={deleteArticleHandler}
        toggleArticleStatus={toggleArticleStatusHandler}
        favLoading={favLoading}
      />
      {!articlesData.articlesCount ? (
        <> </>
      ) : (
        <div className="pagination-container">
          {getPaginationMarkup(articlesData.articlesCount)}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    articlesData: state.articles,
    loading: state.apiCallsInProgress > 0,
    favLoading: state.favApiCallsInProgress > 0
  };
};

let mapDispatchToProps = {
  deleteArticle: articleActions.deleteArticle,
  loadArticles: articleActions.loadArticles,
  markArticleFav: articleActions.markArticleFav,
  markArticleUnFav: articleActions.markArticleUnFav
};

export default connect(mapStateToProps, mapDispatchToProps)(AllArticles);
