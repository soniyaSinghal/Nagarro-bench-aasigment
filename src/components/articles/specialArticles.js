import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as specialArticleActions from "redux/actions/specialArticleActions";
import ArticlesLayout from "./_Presentational/articlesLayout";
import ArticlePagination from "../common/pagination/pagination";
import { toast } from "react-toastify";

const SpecialArticle = ({
  articlesData,
  loading,
  markMyArticleUnFav,
  isFav,
  isTagAssociated,
  loadSpecialArticles,
  tagName,
  markArticleFav,
  markSpecialArticleUnFav,
  wantMyArticles,
  contentHeading,
  deleteSpecialArticle
}) => {
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
    let payload = {};
    if (isFav) {
      payload = {
        favoritedUserName: loggedInUsername
      };
    } else if (isTagAssociated) {
      payload = { tagName };
    } else if (wantMyArticles) {
      payload = {
        userName: loggedInUsername
      };
    } else {
      payload = { ...payload };
    }

    loadSpecialArticles(articleLimit, articleOffset, payload);
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
    let payLoad = {};

    if (isFav) {
      payLoad = {
        favoritedUserName: loggedInUsername
      };
    } else if (isTagAssociated) {
      payLoad = {
        tagName
      };
    } else if (wantMyArticles) {
      payLoad = {
        userName: loggedInUsername
      };
    } else {
      payLoad = { ...payLoad };
    }
    deleteSpecialArticle(
      articleSlug,
      articleLimit,
      initialArticleOffset,
      payLoad
    ).then(() => {
      toast.success("Article has deleted");
    });
  };

  return (
    <div className="all-articles">
      <div className="content-heading">{contentHeading}</div>
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
        <ArticlePagination
          totalNumberOfItem={articlesData.articlesCount}
          dataLimit={articleLimit}
          loadList={loadSpecialArticlesList}
        />
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
  markMyArticleUnFav: specialArticleActions.markMyArticleUnFav,
  loadSpecialArticles: specialArticleActions.loadSpecialArticles,
  markArticleFav: specialArticleActions.markArticleFav,
  markSpecialArticleUnFav: specialArticleActions.markSpecialArticleUnFav,
  deleteSpecialArticle: specialArticleActions.deleteSpecialArticle
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialArticle);
