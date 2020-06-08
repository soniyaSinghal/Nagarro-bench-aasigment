import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as articleActions from "redux/actions/articleActions";
import { handleError } from "api/apiUtils";
import ArticlesLayout from "./_Presentational/articlesLayout";
import ArticlePagination from "components/common/pagination/pagination";

function AllArticles(props) {
  let {
    articlesData,
    loading,
    deleteArticle,
    markArticleFav,
    markArticleUnFav,
    loadArticles,
    favLoading,
    hidePagination,
    hideContentHeading
  } = props;
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
      {!hideContentHeading && (
        <div className="content-heading">All Articles</div>
      )}

      <ArticlesLayout
        articlesData={articlesData}
        loading={loading}
        deleteArticle={deleteArticleHandler}
        toggleArticleStatus={toggleArticleStatusHandler}
        favLoading={favLoading}
      />
      {articlesData.articlesCount && !hidePagination && (
        <div className="pagination-container">
          <ArticlePagination
            totalNumberOfItem={articlesData.articlesCount}
            dataLimit={articleLimit}
            loadList={loadArticlesList}
          />
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
