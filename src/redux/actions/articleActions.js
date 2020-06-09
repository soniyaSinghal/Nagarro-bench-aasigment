import * as types from "./actionTypes";
import * as articleApi from "api/articleApi";
import {
  beginApiCall,
  apiCallError,
  beginFavApiCall,
  endFavApiCall
} from "./apiStatusActions";

export function loadArticlesSuccess(articles) {
  return { type: types.LOAD_ARTICLES_SUCCESS, articles };
}
export function deleteArticlesSuccess() {
  return { type: types.DELETE_ARTICLES_SUCCESS };
}

export function loadSelectedArticleSuccess(article) {
  return { type: types.LOAD_SELECTED_ARTICLE_SUCCESS, article };
}

export function manageArticleSuccess(article) {
  return { type: types.MANAGE_ARTICLE_SUCCESS, article };
}

export function markArticleFavSuccess(article) {
  return { type: types.MARK_ARTICLE_FAV_OPTIMISE, article };
}

export function markArticleUnFavSuccess(article) {
  return { type: types.MARK_ARTICLE_UN_FAV_OPTIMISE, article };
}

export function updateSelectedArticle(article) {
  return { type: types.UPDATE_SELECTED_ARTICLE_OPTIMISE, article };
}

export function loadArticles(articleLimit = 10, articleOffset = 0) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return articleApi
      .getArticles(articleLimit, articleOffset)
      .then(articles => {
        dispatch(loadArticlesSuccess(articles));
      })
      .catch(() => {
        dispatch(apiCallError);
      });
  };
}

export function deleteArticle(articleName, articleLimit, articleOffset) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return articleApi
      .deleteArticle(articleName)
      .then(() => {
        dispatch(deleteArticlesSuccess());
        dispatch(loadArticles(articleLimit, articleOffset));
      })
      .catch(() => {
        dispatch(apiCallError);
      });
  };
}

export function loadSelectedArticle(articleName) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return articleApi
      .getArticle(articleName)
      .then(result => {
        dispatch(loadSelectedArticleSuccess(result.article));
      })
      .catch(() => {
        dispatch(apiCallError);
      });
  };
}

export function updateArticle(articleData, articleSlug) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return articleApi
      .updateArticle(articleData, articleSlug)
      .then(result => {
        dispatch(manageArticleSuccess(result.article));
      })
      .catch(() => {
        dispatch(apiCallError);
      });
  };
}

export function saveArticle(articleData) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return articleApi
      .saveArticle(articleData)
      .then(result => {
        dispatch(manageArticleSuccess(result.article));
        return result.article;
      })
      .catch(() => {
        dispatch(apiCallError);
      });
  };
}

export function markArticleFav(
  articleData,
  wantToChangeSelectedArticle = false
) {
  return function(dispatch) {
    dispatch(beginFavApiCall());
    return articleApi
      .markArticleFav(articleData.slug)
      .then(result => {
        dispatch(endFavApiCall());
        if (wantToChangeSelectedArticle) {
          dispatch(updateSelectedArticle(result.article));
        } else {
          dispatch(markArticleFavSuccess(result.article));
        }
      })
      .catch(() => {
        dispatch(endFavApiCall());
      });
  };
}

export function markArticleUnFav(
  articleData,
  wantToChangeSelectedArticle = false
) {
  return function(dispatch) {
    dispatch(beginFavApiCall());
    return articleApi
      .markArticleUnFav(articleData.slug)
      .then(result => {
        dispatch(endFavApiCall());
        if (wantToChangeSelectedArticle) {
          dispatch(updateSelectedArticle(result.article));
        } else {
          dispatch(markArticleUnFavSuccess(result.article));
        }
      })
      .catch(() => {
        dispatch(endFavApiCall());
      });
  };
}
