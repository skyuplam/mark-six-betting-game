import { fromJS, Map } from 'immutable';
import {
  UPDATE_CURRENT_DRAW_ID,
  UPDATE_NEW_BET_AMOUNT,
  UPDATE_NEW_BET_GAME_TYPE,
  NEW_BET_SUCCESS,
  FETCH_BETS_SUCCESS,
} from './constants';
import {
  reduce,
} from 'lodash';

// The initial state of the App
const initialState = fromJS({
  currentDrawId: '',
  bets: fromJS({}),
  newBet: fromJS({
    betAmount: 0,
    gameType: undefined,
  }),
});

function drawReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NEW_BET_AMOUNT:
      return state
        .setIn(['newBet', 'betAmount'], action.betAmount);
    case UPDATE_NEW_BET_GAME_TYPE:
      return state
        .setIn(['newBet', 'gameType'], action.gameType);
    case UPDATE_CURRENT_DRAW_ID:
      return state
        .set('currentDrawId', action.drawId);
    case NEW_BET_SUCCESS:
    case FETCH_BETS_SUCCESS:
      return state
        .set('bets', reduce(action.bets, (bets, bet) => bets.set(bet._id, bet), Map()));
    default:
      return state;
  }
}

export default drawReducer;
