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
  FETCH_DRAWS,
} from '../App/constants';
import {
  NEW_DRAW,
} from './constants';
import {
  drawsFetched,
  drawsFetchingError,
} from '../App/actions';
import {
  drawCreated,
  drawCreatingError,
} from './actions';
import {
  selectDraw,
} from './selectors';
import config from '../../config';
import {
  assign,
} from 'lodash';


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
      body: JSON.stringify(assign({}, newDraw, {
        createdAt: new Date(),
      })),
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

export function* apiData() {
  // Fork watcher so we can continue execution
  yield [
    getDrawsWatcher(),
    createNewDrawWatcher(),
  ];
}

export default [
  apiData,
]
