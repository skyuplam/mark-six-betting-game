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
} from './constants';

import {
  betted,
  bettingError,
} from './actions';
import {
  selectNewBet,
} from './selectors';
import config from '../../config';
import {
  assign,
} from 'lodash';


export function* bet() {
  const { db } = config;
  const newBet = yield select(selectNewBet());
  const requestURL = join([db.url, 'betting'], '/');

  try {
    yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(assign({}, newBet, {
        bettedAt: new Date(),
      })),
    });
    const betsURI = join([requestURL, '_all_docs'], '/');
    const betsWithAllDocs = join([betsURI, 'include_docs=true'], '?');
    const bets = yield call(request, betsWithAllDocs);
    yield put(betted(bets.rows));
  } catch (err) {
    yield put(bettingError(err));
  }
}

export function* betWatcher() {
  yield fork(takeLatest, NEW_BET, bet);
}

export function* DrawData() {
  // Fork watcher so we can continue execution
  yield [
    betWatcher(),
  ];
}

export default [
  DrawData,
]
