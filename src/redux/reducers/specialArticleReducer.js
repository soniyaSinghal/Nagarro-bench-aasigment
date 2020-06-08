import * as types from "../actions/actionTypes";
import initialState from "./initialState";

let filterSpecialArticles = (articleList, actionArticle) => {
  return articleList.articles.filter(
    article => article.slug !== actionArticle.slug
  );
};

let articleListWithProvidedArticle = (articleList, actionArticle) => {
  return articleList.articles.map(article =>
    article.slug === actionArticle.slug ? actionArticle : article
  );
};

export default function specialArticleReducer(
  state = initialState.specialArticles,
  action
) {
  let tempState = { ...state };
  switch (action.type) {
    case types.LOAD_SPECIAL_ARTICLES_SUCCESS:
      return action.articles;

    case types.MARK_MY_ARTICLE_UN_FAV_OPTIMISE:
      tempState.articles = filterSpecialArticles(tempState, action.article);
      tempState.articlesCount = tempState.articles.length;
      return tempState;

    case types.MARK_SPECIAL_ARTICLE_FAV_OPTIMISE:
      tempState.articles = articleListWithProvidedArticle(
        tempState,
        action.article
      );
      return tempState;

    case types.MARK_SPECIAL_ARTICLE_UN_FAV_OPTIMISE:
      tempState.articles = articleListWithProvidedArticle(
        tempState,
        action.article
      );
      return tempState;

    case types.DELETE_SPECIAL_ARTICLES_SUCCESS:
      return state;

    default:
      return state;
  }
}
