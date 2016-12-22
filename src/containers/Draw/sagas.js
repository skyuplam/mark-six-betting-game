import { takeLatest } from 'redux-saga';
import {
  select,
  call,
  put,
  fork,
} from 'redux-saga/effects';
import {
  join,
} from 'lodash';
import request from '../../utils/request';

import {
  NEW_BET,
  FETCH_BETS,
} from './constants';

import {
  betted,
  bettingError,
  betsFetched,
  betsFetchingError,
} from './actions';
import {
  selectNewBet,
  selectCurrentDrawId,
} from './selectors';
import config from '../../config';
import {
  assign,
} from 'lodash';


export function* bet() {
  const { db } = config;
  const newBet = yield select(selectNewBet());
  const currentDrawId = yield select(selectCurrentDrawId());
  const requestURL = join([db.url, 'betting'], '/');

  try {
    yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(assign({}, newBet, {
        bettedAt: new Date(),
        drawId: currentDrawId,
      }, {
        betOn: JSON.parse(newBet.betOn),
      })),
    });
    const betsURI = join([requestURL, '_find'], '/');
    const bets = yield call(request, betsURI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        selector: {
          drawId: currentDrawId,
        },
        limit: 1000,
      }),
    });
    yield put(betted(bets.docs));
  } catch (err) {
    yield put(bettingError(err));
  }
}

export function* fetchBets() {
  const { db } = config;
  const currentDrawId = yield select(selectCurrentDrawId());
  const requestURL = join([db.url, 'betting', '_find'], '/');

  try {
    const bets = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        selector: {
          drawId: currentDrawId,
        },
        limit: 1000,
      }),
    });
    yield put(betsFetched(bets.docs));
  } catch (err) {
    yield put(betsFetchingError(err));
  }
}

export function* betWatcher() {
  yield fork(takeLatest, NEW_BET, bet);
}

export function* fetchBetsWatcher() {
  yield fork(takeLatest, FETCH_BETS, fetchBets);
}

export function* DrawData() {
  // Fork watcher so we can continue execution
  yield [
    betWatcher(),
    fetchBetsWatcher(),
  ];
}

export default [
  DrawData,
]
