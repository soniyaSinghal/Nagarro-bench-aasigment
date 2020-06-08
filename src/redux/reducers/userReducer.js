import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case types.REGISTRATION_SUCCESS:
      return action.user;
    case types.LOGIN_SUCCESS:
      return action.user;
    // case types.LOAD_USER_DETAILS_SUCCESS:
    //   return action.userDetails;
    case types.LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
}
