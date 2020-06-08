import { _POST, _GET, _PUT } from "api";

/**
 * @description This method will post the user's data to register.
 */
export let registerUser = userData => {
  let authorization = {
    needToRemoveAuthorization: true
  };
  return _POST(`/users`, userData, authorization)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};

/**
 * @description This method will post the user's data to login.
 */
export let loginUser = userData => {
  let authorization = {
    needToRemoveAuthorization: true
  };
  return _POST(`/users/login`, userData, authorization)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};

/**
 * @description This method will get the logged in user data.
 */
export let getUserDetails = userData => {
  let authorization = {
    needToRemoveAuthorization: false
  };
  return _GET(`/user`, userData, authorization)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};

/**
 * @description This method will update the logged in user data.
 */
export let updateUserDetails = userData => {
  let authorization = {
    needToRemoveAuthorization: false
  };
  return _PUT(`/user`, userData, authorization)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};
