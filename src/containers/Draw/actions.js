import {
  UPDATE_CURRENT_DRAW_ID,
  UPDATE_NEW_BET_AMOUNT,
  UPDATE_NEW_BET_GAME_TYPE,
  NEW_BET,
  NEW_BET_SUCCESS,
  NEW_BET_ERROR,
} from './constants';


export const updateCurrentDrawID = (drawId) => ({
  type: UPDATE_CURRENT_DRAW_ID,
  drawId,
});

export const updateNewBetAmount = (betAmount) => ({
  type: UPDATE_NEW_BET_AMOUNT,
  betAmount,
});

export const updateNewBetGameType = (gameTypeId) => ({
  type: UPDATE_NEW_BET_GAME_TYPE,
  gameTypeId,
});

export const newBet = () => ({
  type: NEW_BET,
});

export const betted = (bets) => ({
  type: NEW_BET_SUCCESS,
  bets,
});

export const bettingError = (error) => ({
  type: NEW_BET_ERROR,
  error,
});
