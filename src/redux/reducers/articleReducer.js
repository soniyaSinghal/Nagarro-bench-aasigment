import * as types from "../actions/actionTypes";
import initialState from "./initialState";

let articleListWithProvidedArticle = (articleList, actionArticle) => {
  return articleList.articles.map(article =>
    article.slug === actionArticle.slug ? actionArticle : article
  );
};
export default function articleReducer(state = initialState.articles, action) {
  let tempState = { ...state };
  switch (action.type) {
    case types.LOAD_ARTICLES_SUCCESS:
      return action.articles;
    case types.DELETE_ARTICLES_SUCCESS:
      return state;
    case types.LOAD_SELECTED_ARTICLE_SUCCESS:
      tempState.selectedArticle = action.article;
      return tempState;
    case types.MANAGE_ARTICLE_SUCCESS:
      tempState.selectedArticle = action.article;
      return tempState;
    case types.MARK_ARTICLE_FAV_OPTIMISE:
      tempState.articles = articleListWithProvidedArticle(
        tempState,
        action.article
      );
      return tempState;
    case types.MARK_ARTICLE_UN_FAV_OPTIMISE:
      tempState.articles = articleListWithProvidedArticle(
        tempState,
        action.article
      );
      return tempState;
    case types.MARK_SELECTED_ARTICLE_FAV_OPTIMISE:
      tempState.selectedArticle = { ...action.article };
      return tempState;

    case types.MARK_SELECTED_ARTICLE_UN_FAV_OPTIMISE:
      tempState.selectedArticle = { ...action.article };
      return tempState;

    default:
      return state;
  }
}
