import {
  range,
} from 'lodash';

export const SPECIAL_DRAW_E = 'SpecialDrawE';
export const SPECIAL_DRAW_A = 'SpecialDrawA';
export const SPECIAL_DRAW_LARGE_SMALL = 'SpecialDrawLargeSmall';

export const gameTypes = [
  {
    type: SPECIAL_DRAW_E,
    desc: 'Special Draw E',
  },
  {
    type: SPECIAL_DRAW_A,
    desc: 'Special Draw A',
  },
  {
    type: SPECIAL_DRAW_LARGE_SMALL,
    desc: 'Special Draw Large (26-49) / Small (1-24) / Draw (25)',
  },
];

export const gameBets = (type) => {
  switch (type) {
    case SPECIAL_DRAW_LARGE_SMALL:
      return ['Large', 'Small', 'Draw'];
    default:
      return range(1, 50);
  }
}
