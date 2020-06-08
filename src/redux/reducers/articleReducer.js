import * as types from "../actions/actionTypes";
import initialState from "./initialState";

let articleListWithProvidedArticle = (articleList, actionArticle) => {
  return articleList.articles.map(article =>
    article.slug === actionArticle.slug ? actionArticle : article
  );
};
export default function articleReducer(state = initialState.articles, action) {
  let stateCopy = { ...state };
  switch (action.type) {
    case types.LOAD_ARTICLES_SUCCESS:
      return action.articles;

    case types.DELETE_ARTICLES_SUCCESS:
      return state;

    case types.LOAD_SELECTED_ARTICLE_SUCCESS:
      stateCopy.selectedArticle = action.article;
      return stateCopy;

    case types.MANAGE_ARTICLE_SUCCESS:
      stateCopy.selectedArticle = action.article;
      return stateCopy;

    case types.MARK_ARTICLE_FAV_OPTIMISE:
      stateCopy.articles = articleListWithProvidedArticle(
        stateCopy,
        action.article
      );
      return stateCopy;

    case types.MARK_ARTICLE_UN_FAV_OPTIMISE:
      stateCopy.articles = articleListWithProvidedArticle(
        stateCopy,
        action.article
      );
      return stateCopy;

    case types.MARK_SELECTED_ARTICLE_FAV_OPTIMISE:
      stateCopy.selectedArticle = { ...action.article };
      return stateCopy;

    case types.MARK_SELECTED_ARTICLE_UN_FAV_OPTIMISE:
      stateCopy.selectedArticle = { ...action.article };
      return stateCopy;

    default:
      return state;
  }
}
