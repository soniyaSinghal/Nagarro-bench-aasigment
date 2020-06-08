import { _GET } from "api";

/**
 * @description This method will fetch the tag list from back end.
 */
export let getTags = () => {
  let authorization = {
    needToRemoveAuthorization: true
  };
  return _GET("/tags", authorization)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};
