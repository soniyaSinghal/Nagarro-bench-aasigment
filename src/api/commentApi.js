import { _GET, _POST, _DELETE } from "api";

/**
 * @description This method will fetch the comments list for selected article
 */
export let getComments = articleName => {
  return _GET(`/articles/${articleName}/comments`)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};

/**
 * @description This method will post the comment
 */
export let postComment = (articleName, commentData) => {
  return _POST(`/articles/${articleName}/comments`, commentData)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};

/**
 * @description This method will post the comment
 */
export let deleteComment = (articleName, commentId) => {
  return _DELETE(`/articles/${articleName}/comments/${commentId}`)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};
