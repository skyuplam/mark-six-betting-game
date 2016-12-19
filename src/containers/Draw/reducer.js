import { fromJS, Map } from 'immutable';
import {
  UPDATE_CURRENT_DRAW_ID,
  UPDATE_NEW_BET,
  NEW_BET_SUCCESS,
  FETCH_BETS_SUCCESS,
  UPDATE_CAPITAL,
} from './constants';
import {
  reduce,
  assign,
} from 'lodash';

// The initial state of the App
const initialState = fromJS({
  currentDrawId: '',
  bets: fromJS({}),
  newBet: fromJS({}),
  capital: 0,
});

function drawReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NEW_BET:
      return state
        .set('newBet', fromJS(assign(state.get('newBet').toJS(), action.bet)));
    case UPDATE_CURRENT_DRAW_ID:
      return state
        .set('currentDrawId', action.drawId);
    case UPDATE_CAPITAL:
      return state
        .set('capital', action.capital);
    case NEW_BET_SUCCESS:
    case FETCH_BETS_SUCCESS:
      return state
        .set('bets', reduce(action.bets, (bets, bet) => bets.set(bet._id, bet), Map()));
    default:
      return state;
  }
}

export default drawReducer;
