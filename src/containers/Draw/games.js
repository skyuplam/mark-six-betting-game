import {
  range,
  map,
  toString,
} from 'lodash';

export const SPECIAL_NUMBER_E = 'SNE';
export const SPECIAL_NUMBER_A = 'SNA';
export const SPECIAL_NUMBER_LARGE_SMALL = 'SNLargeSmall';

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

export const gameBets = (type) => {
  switch (type) {
    case SPECIAL_NUMBER_LARGE_SMALL:
      return ['Large', 'Small', 'Draw'];
    default:
      return map(range(1, 50), (d) => toString(d));
  }
}
