import * as types from "./actionTypes";
import * as userApi from "api/userApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function registrationSuccess(user) {
  return { type: types.REGISTRATION_SUCCESS, user };
}

export function loginSuccess(user) {
  return { type: types.LOGIN_SUCCESS, user };
}

export function logout() {
  return { type: types.LOGOUT_SUCCESS };
}

export function getUserDataSuccess(user) {
  return { type: types.GET_USER_DATA_SUCCESS, user };
}

export function updateUserDetailsSuccess(user) {
  return { type: types.GET_USER_DATA_SUCCESS, user };
}

export function registerUser(userData) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return userApi
      .registerUser(userData)
      .then(result => {
        if (result && result.user && result.user.token) {
          localStorage.setItem("jwtToken", JSON.stringify(result.user.token));
          localStorage.setItem("userDetails", JSON.stringify(result.user));
          dispatch(registrationSuccess(result.user));
        } else {
          dispatch(apiCallError);
        }
      })
      .catch(error => {
        dispatch(apiCallError);
        return Promise.reject(error);
      });
  };
}

export function loginUser(userData) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return userApi
      .loginUser(userData)
      .then(result => {
        if (result && result.user && result.user.token) {
          localStorage.setItem("userDetails", JSON.stringify(result.user));
          localStorage.setItem("jwtToken", JSON.stringify(result.user.token));
          dispatch(loginSuccess(result.user));
        } else {
          dispatch(apiCallError);
        }
      })
      .catch(error => {
        dispatch(apiCallError);
        return Promise.reject(error);
      });
  };
}

export function logoutUser() {
  return function(dispatch) {
    localStorage.removeItem("userDetails");
    localStorage.removeItem("jwtToken");
    dispatch(logout());
  };
}

export function getUserData() {
  return function(dispatch) {
    dispatch(beginApiCall());

    return userApi
      .getUserDetails()
      .then(result => {
        dispatch(getUserDataSuccess(result.user));
      })
      .catch(error => {
        dispatch(apiCallError);
        return Promise.reject(error);
      });
  };
}

export function updateUserDetails() {
  return function(dispatch) {
    dispatch(beginApiCall());

    return userApi
      .getUserDetails()
      .then(result => {
        dispatch(updateUserDetailsSuccess(result.user));
      })
      .catch(error => {
        dispatch(apiCallError);
        return Promise.reject(error);
      });
  };
}
