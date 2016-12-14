import { fromJS, Map } from 'immutable';
import {
  FETCH_SETTINGS_SUCCESS,
} from './constants';
import {
  reduce,
} from 'lodash';

// The initial state of the App
const initialState = fromJS({
  gameSettings: fromJS({}),
});

function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SETTINGS_SUCCESS:
      return state
        .set('gameSettings', reduce(action.settings,
          (games, g) => games.set(g.id, g.doc),
          Map(),
        ));
    default:
      return state;
  }
}

export default settingsReducer;
