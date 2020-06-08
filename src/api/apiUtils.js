import { toast } from "react-toastify";

/**
 *
 * @param {Object} error
 * @param {String} errorMessage
 * @description This method will display the error notification
 * @returns {Object} Promise object
 */
export const handleError = (errorMessage, error) => {
  if (error.response && error.response.data && error.response.data.errors) {
    let errorMap = error.response.data.errors;
    let errorKeys = Object.keys(errorMap);
    let message = errorKeys.map((errorName, index) => {
      return `${errorName} ${errorMap[errorName]}${
        index === errorKeys.length - 2 ? ", " : ""
      }`;
    });
    toast.error(message);
  } else {
    toast.error(errorMessage);
  }
  return Promise.reject(error);
};
