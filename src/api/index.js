// This file is the axios interceptor.
import axios from "axios";
import { handleError } from "./apiUtils";
import { _GET, _POST, _PUT, _DELETE } from "./api";

// specified the baseURL of backend API call
axios.defaults.baseURL = "https://conduit.productionready.io/api";

axios.interceptors.request.use(function(config = {}) {
  //adding this check as I need remove token from some api request
  if (config.needToRemoveAuthorization) {
    return config;
  } else {
    const token = localStorage.getItem("jwtToken")
      ? JSON.parse(localStorage.getItem("jwtToken"))
      : "";
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  }
});

// Handler the all responses of back end API
axios.interceptors.response.use(
  function(response) {
    return response.data;
  },
  function(error) {
    if (error.response && error.response.status === 404) {
      document.location.href = "/";
    } else if (500 === error.response && error.response.status) {
      handleError("Internal Server Error", error);
    } else {
      handleError("Something went wrong", error);
    }
  }
);

export { _GET, _POST, _PUT, _DELETE };
