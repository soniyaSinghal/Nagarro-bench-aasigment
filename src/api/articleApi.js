import { _GET, _DELETE, _POST, _PUT } from "api";

/**
 * @description This method will fetch the Article list from back end.
 */
export let getArticles = (limit, offset, tagName = "") => {
  let articleLimit = limit ? limit : 10000;
  let articleOffset = offset ? offset : 0;
  let authorization = {
    needToRemoveAuthorization: JSON.stringify(localStorage.getItem("jwtToken"))
      ? false
      : true
  };
  return _GET(
    `/articles?limit=${articleLimit}&offset=${articleOffset}${
      tagName ? `&tag=${tagName}` : ""
    }`,
    authorization
  )
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};

/**
 * @description This method will delete the article
 */
export let deleteArticle = articleName => {
  return _DELETE(`/articles/${articleName}`)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};

/**
 * @description This method will get the data of article
 */
export let getArticle = articleName => {
  return _GET(`/articles/${articleName}`)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};

/**
 * @description This method will update the data of article
 */
export let updateArticle = (articleData, articleSlug) => {
  debugger;
  return _PUT(`/articles/${articleSlug}`, articleData)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};

/**
 * @description This method will save the data of article
 */
export let saveArticle = articleData => {
  return _POST(`/articles`, articleData)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};

/**
 * @description This method will mark the article favorite
 */
export let markArticleFav = articleSlug => {
  return _POST(`/articles/${articleSlug}/favorite`)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};

/**
 * @description This method will mark the article un-favorite
 */
export let markArticleUnFav = articleSlug => {
  return _DELETE(`/articles/${articleSlug}/favorite`)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};

/**
 * @description This method will fetch the fav Article list of user from back end.
 */
export let getFavArticles = (limit, offset, userName) => {
  let articleLimit = limit ? limit : 1000000;
  let articleOffset = offset ? offset : 0;

  return _GET(
    `/articles?favorited=${userName}&limit=${articleLimit}&offset=${articleOffset}`
  )
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};
