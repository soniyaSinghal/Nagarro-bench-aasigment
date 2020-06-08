import * as types from "./actionTypes";
import * as commentApi from "api/commentApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadCommentsSuccess(comments) {
  return { type: types.LOAD_COMMENTS_SUCCESS, comments };
}

export function saveCommentsSuccess(comment) {
  return { type: types.SAVE_COMMENT_SUCCESS, comment };
}

export function deleteCommentSuccess(commentId) {
  return { type: types.DELETE_COMMENT_OPTIMISE, commentId };
}

export function loadComments(articleSlug) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return commentApi
      .getComments(articleSlug)
      .then(result => {
        dispatch(loadCommentsSuccess(result.comments));
      })
      .catch(() => {
        dispatch(apiCallError);
      });
  };
}

export function saveComment(articleSlug, commentData) {
  return function(dispatch) {
    return commentApi.postComment(articleSlug, commentData).then(result => {
      dispatch(saveCommentsSuccess(result.comment));
    });
  };
}

export function deleteComment(articleSlug, commentId) {
  return function(dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteCommentSuccess(commentId));
    return commentApi.deleteComment(articleSlug, commentId);
  };
}
