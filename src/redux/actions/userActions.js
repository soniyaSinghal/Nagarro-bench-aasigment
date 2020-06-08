import * as types from "./actionTypes";
import * as userApi from "api/userApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function registrationSuccess(user) {
  return { type: types.REGISTRATION_SUCCESS, user };
}

export function loginSuccess(user) {
  return { type: types.LOGIN_SUCCESS, user };
}

// export function loadUserDetailsSuccess(userDetails) {
//   console.log(userDetails);
//   return { type: types.LOAD_USER_DETAILS_SUCCESS, userDetails };
// }

export function logout() {
  return { type: types.LOGOUT_SUCCESS };
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

// export function getUserDetails(userData) {
//   return function(dispatch) {
//     dispatch(beginApiCall());
//     return userApi
//       .getUserDetails(userData)
//       .then(result => {
//         if (result && result.user && result.user.token) {
//           localStorage.setItem("userDetails", JSON.stringify(result.user));
//           localStorage.setItem("jwtToken", JSON.stringify(result.user.token));
//           dispatch(loadUserDetailsSuccess(result.user));
//         } else {
//           dispatch(apiCallError);
//         }
//       })
//       .catch(error => {
//         dispatch(apiCallError);
//         return Promise.reject(error);
//       });
//   };
// }

export function logoutUser() {
  return function(dispatch) {
    localStorage.removeItem("userDetails");
    localStorage.removeItem("jwtToken");
    dispatch(logout());
  };
}
