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
  selectDraw,
} from './selectors';
import config from '../../config';


export function* getDraws() {
  const { db } = config;
  const requestURL = join([join([db.url, 'draw', '_all_docs'], '/'), 'include_docs=true'], '?');

  try {
    const draws = yield call(request, requestURL);
    yield put(drawsFetched(draws));
  } catch (err) {
    yield put(drawsFetchingError(err));
  }
}

export function* createNewDraw() {
  const { db } = config;
  const newDraw = yield select(selectDraw());
  const requestURL = join([db.url, 'draw'], '/');

  try {
    const draw = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newDraw),
    });
    const drawWithDetail = yield call(request, join([requestURL, draw.id], '/'));
    yield put(drawCreated(drawWithDetail));
  } catch (err) {
    yield put(drawCreatingError(err));
  }
}

export function* getDrawsWatcher() {
  yield fork(takeLatest, FETCH_DRAWS, getDraws);
}

export function* createNewDrawWatcher() {
  yield fork(takeLatest, NEW_DRAW, createNewDraw);
}

export function* DrawData() {
  // Fork watcher so we can continue execution
  yield [
    getDrawsWatcher(),
    createNewDrawWatcher(),
  ];
}

export default [
  DrawData,
]
