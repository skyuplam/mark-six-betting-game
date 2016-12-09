import {
  TOGGLE_MENU,
  FETCH_DRAWS,
  FETCH_DRAWS_SUCCESS,
  FETCH_DRAWS_ERROR,
} from './constants';


export function toggleMenu() {
  return {
    type: TOGGLE_MENU,
  };
}


/**
 * Fetch the latest draws from DB
 */
export function fetchDraws() {
  return {
    type: FETCH_DRAWS,
  };
}

/**
 * Fetch draws successully
 */
export function drawsFetched(draws) {
  return {
    type: FETCH_DRAWS_SUCCESS,
    draws,
  }
}

/**
 * Faile to fetch draw
 */
export function drawsFetchingError(error) {
  return {
    type: FETCH_DRAWS_ERROR,
    error,
  };
}
