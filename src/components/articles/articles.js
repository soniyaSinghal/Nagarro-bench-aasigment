import React from "react";
import PropTypes from "prop-types";
import ArticlesLayout from "./_Presentational/articlesLayout";
import { connect } from "react-redux";
import {
  deleteArticle,
  markArticleFav,
  markArticleUnFav
} from "redux/actions/articleActions";

function Articles({
  articlesData,
  loading,
  articleOffset,
  articleLimit,
  deleteArticle,
  markArticleFav,
  markArticleUnFav,
  favLoading
}) {
  /**
   *
   * @param {String} articleSlug
   * @description This method will dispatch the action to delete the selected article
   */
  let deleteArticleHandler = articleSlug => {
    deleteArticle(articleSlug, articleLimit, articleOffset);
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
    <div>
      <ArticlesLayout
        articlesData={articlesData}
        loading={loading}
        deleteArticle={deleteArticleHandler}
        toggleArticleStatus={toggleArticleStatusHandler}
        favLoading={favLoading}
      />
    </div>
  );
}
Articles.propTypes = {
  articlesData: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  favLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    favLoading: state.favApiCallsInProgress > 0
  };
};
let mapDispatchToProps = {
  deleteArticle,
  markArticleFav,
  markArticleUnFav
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
