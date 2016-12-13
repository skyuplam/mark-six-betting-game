/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux-immutable';

import globalReducer from './containers/App/reducer';
import languageProviderReducer from './containers/LanguageProvider/reducer';
import homeReducer from './containers/HomePage/reducer';
import drawReducer from './containers/Draw/reducer';
import settingsReducer from './containers/Settings/reducer';

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    global: globalReducer,
    language: languageProviderReducer,
    home: homeReducer,
    draw: drawReducer,
    settings: settingsReducer,
  });
}
