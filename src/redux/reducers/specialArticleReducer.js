import * as types from "../actions/actionTypes";
import initialState from "./initialState";

/**
 * This method will filter the data on the basis of match slug of article
 */
let filterSpecialArticles = (articleList, actionArticle) => {
  return articleList.articles.filter(
    article => article.slug !== actionArticle.slug
  );
};

/**
 * This method will return the list with replaced matched data
 */
let articleListWithProvidedArticle = (articleList, actionArticle) => {
  return articleList.articles.map(article =>
    article.slug === actionArticle.slug ? actionArticle : article
  );
};

export default function specialArticleReducer(
  state = initialState.specialArticles,
  action
) {
  let stateCopy = { ...state };

  switch (action.type) {
    case types.LOAD_SPECIAL_ARTICLES_SUCCESS:
      return action.articles;

    case types.MARK_MY_ARTICLE_UN_FAV_OPTIMISE:
      stateCopy.articles = filterSpecialArticles(stateCopy, action.article);
      stateCopy.articlesCount = stateCopy.articles.length;
      return stateCopy;

    case types.MARK_SPECIAL_ARTICLE_FAV_OPTIMISE:
      stateCopy.articles = articleListWithProvidedArticle(
        stateCopy,
        action.article
      );
      return stateCopy;

    case types.MARK_SPECIAL_ARTICLE_UN_FAV_OPTIMISE:
      stateCopy.articles = articleListWithProvidedArticle(
        stateCopy,
        action.article
      );
      return stateCopy;

    case types.DELETE_SPECIAL_ARTICLES_SUCCESS:
      return state;

    default:
      return state;
  }
}
