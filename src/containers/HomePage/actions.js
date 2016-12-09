import {
  UPDATE_DRAW_DATE,
  UPDATE_NEXT_DRAW_NUMBER,
  NEW_DRAW,
  NEW_DRAW_SUCCESS,
  NEW_DRAW_ERROR,
} from './constants';


export function updateDrawDate(date) {
  return {
    type: UPDATE_DRAW_DATE,
    date,
  };
}

export function updateNextDrawNumber(drawNumber) {
  return {
    type: UPDATE_NEXT_DRAW_NUMBER,
    drawNumber,
  };
}

export function newDraw() {
  return {
    type: NEW_DRAW,
  };
}

export function drawCreated(draw) {
  return {
    type: NEW_DRAW_SUCCESS,
    draw,
  };
}

export function drawCreatingError(error) {
  return {
    type: NEW_DRAW_ERROR,
    error,
  }
}
