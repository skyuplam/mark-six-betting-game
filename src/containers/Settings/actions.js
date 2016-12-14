import {
  FETCH_SETTINGS,
  FETCH_SETTINGS_SUCCESS,
  FETCH_SETTINGS_ERROR,
} from './constants';

export const fetchSettings = () => ({
  type: FETCH_SETTINGS,
});

export const settingsFetched = (settings) => ({
  type: FETCH_SETTINGS_SUCCESS,
  settings,
});

export const settingsFetchingError = (error) => ({
  type: FETCH_SETTINGS_ERROR,
  error,
});
