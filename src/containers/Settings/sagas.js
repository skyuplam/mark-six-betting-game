import { takeLatest } from 'redux-saga';
import {
  call,
  put,
  fork,
} from 'redux-saga/effects';
import {
  join,
} from 'lodash';
import request from '../../utils/request';

import {
  FETCH_SETTINGS,
} from './constants';

import {
  settingsFetched,
  settingsFetchingError,
} from './actions';
import config from '../../config';


export function* fetchSettings() {
  const { db } = config;
  const requestURL = join([join([db.url, 'settings', '_all_docs'], '/'), 'include_docs=true'], '?');

  try {
    const bets = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    yield put(settingsFetched(bets.rows));
  } catch (err) {
    yield put(settingsFetchingError(err));
  }
}

export function* fetchSettingsWatcher() {
  yield fork(takeLatest, FETCH_SETTINGS, fetchSettings);
}

export function* settingsData() {
  // Fork watcher so we can continue execution
  yield [
    fetchSettingsWatcher(),
  ];
}

export default [
  settingsData,
]
