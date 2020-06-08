import * as types from "./actionTypes";

export function beginApiCall() {
  return { type: types.BEGIN_API_CALL };
}

export function apiCallError() {
  return { type: types.API_CALL_ERROR };
}

export function beginFavApiCall() {
  return { type: types.BEGIN_FAV_API_CALL };
}

export function endFavApiCall() {
  return { type: types.END_FAV_API_CALL };
}
