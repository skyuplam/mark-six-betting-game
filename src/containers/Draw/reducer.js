import { fromJS } from 'immutable';
import {
  UPDATE_CURRENT_DRAW_ID,
  UPDATE_NEW_BET_AMOUNT,
  UPDATE_NEW_BET_GAME_TYPE,
  NEW_BET_SUCCESS,
} from './constants';


// The initial state of the App
const initialState = fromJS({
  currentDrawId: '',
  bets: fromJS([]),
  newBet: fromJS({
    betAmount: 0,
    gameTypeId: undefined,
  }),
});

function drawReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NEW_BET_AMOUNT:
      return state
        .setIn(['newBet', 'betAmount'], action.betAmount);
    case UPDATE_NEW_BET_GAME_TYPE:
      return state
        .setIn(['newBet', 'gameTypeId'], action.gameTypeId);
    case UPDATE_CURRENT_DRAW_ID:
      return state
        .set('currentDrawId', action.drawId);
    case NEW_BET_SUCCESS:
      return state
        .set('bets', fromJS(action.bets));
    default:
      return state;
  }
}

export default drawReducer;
