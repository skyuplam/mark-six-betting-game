import { fromJS, Map } from 'immutable';
import {
} from './constants';

// The initial state of the App
const initialState = fromJS({
});

function settingsReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default settingsReducer;
