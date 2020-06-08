import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function favApiStatusReducer(
  state = initialState.favApiCallsInProgress,
  action
) {
  if (action.type === types.BEGIN_FAV_API_CALL) {
    return state + 1;
  } else if (action.type === types.END_FAV_API_CALL) {
    return state - 1;
  } else {
    return state;
  }
}
