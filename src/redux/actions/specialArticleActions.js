import * as types from "./actionTypes";
import * as articleApi from "api/articleApi";
import {
  beginApiCall,
  apiCallError,
  beginFavApiCall,
  endFavApiCall
} from "./apiStatusActions";

export function loadSpecialArticlesSuccess(articles) {
  return { type: types.LOAD_SPECIAL_ARTICLES_SUCCESS, articles };
}

export function markMyArticleUnFavSuccess(article) {
  return { type: types.MARK_MY_ARTICLE_UN_FAV_OPTIMISE, article };
}

export function deleteSpecialArticlesSuccess() {
  return { type: types.DELETE_SPECIAL_ARTICLES_SUCCESS };
}

export function markSpecialArticleFavSuccess(article) {
  return { type: types.MARK_SPECIAL_ARTICLE_FAV_OPTIMISE, article };
}

export function markSpecialArticleUnFavSuccess(article) {
  return { type: types.MARK_SPECIAL_ARTICLE_UN_FAV_OPTIMISE, article };
}
export function loadMyFavArticles(
  articleLimit = 10,
  articleOffset = 0,
  userName = ""
) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return articleApi
      .getFavArticles(articleLimit, articleOffset, userName)
      .then(result => {
        dispatch(loadSpecialArticlesSuccess(result));
      })
      .catch(() => {
        dispatch(apiCallError);
      });
  };
}

export function markMyArticleUnFav(articleData) {
  return function(dispatch) {
    dispatch(beginFavApiCall());
    return articleApi
      .markArticleUnFav(articleData.slug)
      .then(result => {
        dispatch(endFavApiCall());
        dispatch(markMyArticleUnFavSuccess(result.article));
      })
      .catch(() => {
        dispatch(endFavApiCall());
      });
  };
}

export function markSpecialArticleUnFav(articleData) {
  return function(dispatch) {
    dispatch(beginFavApiCall());
    return articleApi
      .markArticleUnFav(articleData.slug)
      .then(result => {
        dispatch(endFavApiCall());
        dispatch(markSpecialArticleUnFavSuccess(result.article));
      })
      .catch(() => {
        dispatch(endFavApiCall());
      });
  };
}

export function markArticleFav(articleData) {
  return function(dispatch) {
    dispatch(beginFavApiCall());
    return articleApi
      .markArticleFav(articleData.slug)
      .then(result => {
        dispatch(endFavApiCall());
        dispatch(markSpecialArticleFavSuccess(result.article));
      })
      .catch(() => {
        dispatch(endFavApiCall());
      });
  };
}

export function deleteMyFavArticle(
  articleName,
  articleLimit,
  articleOffset,
  userName
) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return articleApi
      .deleteArticle(articleName)
      .then(() => {
        dispatch(deleteSpecialArticlesSuccess());
        dispatch(loadMyFavArticles(articleLimit, articleOffset, userName));
      })
      .catch(() => {
        dispatch(apiCallError);
      });
  };
}

export function loadSpecialArticles(
  articleLimit = 10,
  articleOffset = 0,
  otherParam
) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return articleApi
      .getArticles(articleLimit, articleOffset, otherParam)
      .then(result => {
        dispatch(loadSpecialArticlesSuccess(result));
      })
      .catch(() => {
        dispatch(apiCallError);
      });
  };
}
