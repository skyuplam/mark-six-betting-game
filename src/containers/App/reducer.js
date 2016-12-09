import { fromJS, Map } from 'immutable';
import {
  reduce,
} from 'lodash';
import {
  TOGGLE_MENU,
  FETCH_DRAWS,
  FETCH_DRAWS_SUCCESS,
} from './constants';

import {
  NEW_DRAW,
  NEW_DRAW_SUCCESS,
} from '../HomePage/constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  showMenu: false,
  draws: fromJS({}),
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MENU:
      return state.set('showMenu', !state.get('showMenu'));
    case NEW_DRAW:
    case FETCH_DRAWS:
      return state
        .set('loading', true)
        .set('error', false);
    case FETCH_DRAWS_SUCCESS:
      return state
        .set('draws',
          reduce(
            action.draws.rows,
            (draws, json) =>
              draws.set(json.id, json.doc),
            Map()
          ));
    case NEW_DRAW_SUCCESS:
      return state
        .setIn(['draws', action.draw._id], action.draw);
    default:
      return state;
  }
}

export default appReducer;
