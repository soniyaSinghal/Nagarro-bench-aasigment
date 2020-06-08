import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReadArticleLayout from "./_Presentational/readArticleLayout";
import {
  loadSelectedArticle,
  markArticleUnFav,
  markArticleFav
} from "redux/actions/articleActions";
import * as commentAction from "redux/actions/commentAction";

export const ReadArticle = props => {
  let {
    slug,
    selectedArticle,
    loading,
    loadSelectedArticle,
    loadComments,
    markArticleFav,
    markArticleUnFav
  } = props;

  /**
   * @description React life cycle method
   */
  useEffect(() => {
    if (slug) {
      loadSelectedArticle(slug);
      loadComments(slug);
    }
  }, [slug, loadComments, loadSelectedArticle]);

  /**
   *
   * @description This method will toggle the fav state of article
   */
  let toggleFavHandler = articleData => {
    let wantToChangeSelectedArticle = true;
    if (articleData.favorited) {
      markArticleUnFav(articleData, wantToChangeSelectedArticle);
    } else {
      markArticleFav(articleData, wantToChangeSelectedArticle);
    }
  };

  return (
    <ReadArticleLayout
      selectedArticle={selectedArticle}
      loading={loading}
      slug={slug}
      toggleFav={toggleFavHandler}
    />
  );
};

ReadArticle.propTypes = {
  slug: PropTypes.string.isRequired,
  selectedArticle: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    slug: ownProps.match.params.slug,
    selectedArticle: state.articles.selectedArticle
      ? state.articles.selectedArticle
      : {},
    loading: state.apiCallsInProgress > 0
  };
};

const mapDispatchToProps = {
  loadComments: commentAction.loadComments,
  loadSelectedArticle,
  markArticleUnFav,
  markArticleFav
};

export default connect(mapStateToProps, mapDispatchToProps)(ReadArticle);
