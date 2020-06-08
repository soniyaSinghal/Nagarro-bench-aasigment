import * as types from "./actionTypes";
import * as tagsApi from "api/tagsApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadTagsSuccess(tags) {
  return { type: types.LOAD_TAGS_SUCCESS, tags };
}

export function loadTags() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return tagsApi
      .getTags()
      .then(result => {
        dispatch(loadTagsSuccess(result.tags));
      })
      .catch(() => {
        dispatch(apiCallError);
      });
  };
}
