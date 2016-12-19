import {
  UPDATE_NEW_BET,
  UPDATE_CURRENT_DRAW_ID,
  NEW_BET,
  NEW_BET_SUCCESS,
  NEW_BET_ERROR,
  FETCH_BETS,
  FETCH_BETS_SUCCESS,
  FETCH_BETS_ERROR,
  UPDATE_CAPITAL,
} from './constants';


export const updateNewBet = (bet) => ({
  type: UPDATE_NEW_BET,
  bet,
});

export const updateCurrentDrawID = (drawId) => ({
  type: UPDATE_CURRENT_DRAW_ID,
  drawId,
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


export const fetchBets = () => ({
  type: FETCH_BETS,
});

export const betsFetched = (bets) => ({
  type: FETCH_BETS_SUCCESS,
  bets,
});

export const betsFetchingError = (error) => ({
  type: FETCH_BETS_ERROR,
  error,
});

export const updateCapital = (capital) => ({
  type: UPDATE_CAPITAL,
  capital,
});
