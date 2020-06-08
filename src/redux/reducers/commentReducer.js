import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function tagReducer(state = initialState.comments, action) {
  let tempState = { ...state };
  let stateAfterDeleteComment = { ...tempState };
  switch (action.type) {
    case types.LOAD_COMMENTS_SUCCESS:
      tempState.commentsList = [...action.comments];
      return tempState;
    case types.SAVE_COMMENT_SUCCESS:
      tempState.commentsList = [action.comment, ...state.commentsList];
      return tempState;
    case types.DELETE_COMMENT_OPTIMISE:
      stateAfterDeleteComment.commentsList = tempState.commentsList.filter(
        comment => comment.id !== action.commentId
      );
      return { ...stateAfterDeleteComment };
    default:
      return state;
  }
}
