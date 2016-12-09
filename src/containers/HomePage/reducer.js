import { fromJS } from 'immutable';
import {
  UPDATE_DRAW_DATE,
  UPDATE_NEXT_DRAW_NUMBER,
} from './constants';


const initialState = fromJS({
  draw: fromJS({
    drawDate: new Date(),
    nextDrawNumber: '',
    hasResult: false,
  }),
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_DRAW_DATE:
      return state
        .setIn(['draw', 'drawDate'], action.date);
    case UPDATE_NEXT_DRAW_NUMBER:
      return state
        .setIn(['draw', 'nextDrawNumber'], action.drawNumber);
    default:
      return state;
  }
}

export default homeReducer;
