import axios from "axios";

/**
 *
 * @param {String} url
 * @param {Object} data
 * @description This method will call the get method of axios library
 * @returns {Object} // a promise object
 */
const _GET = async (url, data) => {
  try {
    return await axios.get(url, data);
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 *
 * @param {String} url
 * @param {Object} data
 * @description This method will call the post method of axios library with provided data
 * @returns {Object} // a promise object
 */
const _POST = async (url, data) => {
  try {
    return await axios.post(url, data);
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 *
 * @param {String} url
 * @param {Object} data
 * @description This method will call the put method of axios library with provided data
 * @returns {Object} // a promise object
 */
const _PUT = async (url, data) => {
  try {
    return await axios.put(url, data);
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 *
 * @param {String} url
 * @param {Object} data
 * @description This method will call the delte method of axios library with provided data
 * @returns {Object} // a promise object
 */
const _DELETE = async (url, data) => {
  try {
    return await axios.delete(url, data);
  } catch (error) {
    Promise.reject(error);
  }
};

export { _GET, _POST, _PUT, _DELETE };
