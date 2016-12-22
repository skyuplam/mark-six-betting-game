import {
  range,
  map,
  toString,
} from 'lodash';

import {
  SPECIAL_NUMBER_E,
  SPECIAL_NUMBER_A,
  SPECIAL_NUMBER_LARGE_SMALL,
  SN_LARGE_SMALL_LARGE,
  SN_LARGE_SMALL_SMALL,
} from './constants';


export const gameTypes = [
  {
    type: SPECIAL_NUMBER_E,
    desc: 'Special Number E',
  },
  {
    type: SPECIAL_NUMBER_A,
    desc: 'Special Number A, (10% secured)',
  },
  {
    type: SPECIAL_NUMBER_LARGE_SMALL,
    desc: 'Special Number Large (26-49) / Small (1-24) / Number (25)',
  },
];


function gameTypeOptions(option) {
  switch (option) {
    case SN_LARGE_SMALL_LARGE:
      return JSON.stringify(range(26, 50));
    case SN_LARGE_SMALL_SMALL:
      return JSON.stringify(range(1, 26));
    default:
      return option;
  }
}

export function hasDraw(gameType) {
  switch (gameType) {
    case SPECIAL_NUMBER_LARGE_SMALL:
      return [25];
    default:
      return false;
  }
}

/*
 * @type: constan, game type fron ./constants
 * @formatMessage: function, intl.formatMessage.
 *   e.g. (t) => intl.formatMessage(msg[t])
 *
 * @returns an array of object with text and value attributes.
 *    e.g. [{ text: 1, value: 1}]
 */
export const gameBets = (type, formatMessage) => {
  switch (type) {
    case SPECIAL_NUMBER_LARGE_SMALL:
      return map([
        SN_LARGE_SMALL_LARGE,
        SN_LARGE_SMALL_SMALL,
      ], (t) => ({
        text: formatMessage ? formatMessage(t) : t,
        value: gameTypeOptions(t),
      }));
    default:
      return map(range(1, 50), (d) => ({
        text: toString(d),
        value: toString(d),
      }));
  }
};
