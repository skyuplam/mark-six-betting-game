import {
  SPECIAL_NUMBER_A,
  SPECIAL_NUMBER_E,
  SPECIAL_NUMBER_LARGE_SMALL,
} from '../src/containers/Draw/constants';


const config = {
  version: '1.0.0',
  db: {
    betting: {},
    draw: {},
    settings: [
      {
        _id: 'SNE',
        game: 'SNE',
        winningProbability: 1.0/49.0,
        winningOdds: 48.0,
        drawProbability: 0/49.0,
        drawOdds: 1.0,
        lossOdds: 0.0,
        income: 1.0,
        rebatePct: 0.0,
        commissionPct: 0.01,
      },
      {
        _id: 'SNA',
        game: 'SNA',
        winningProbability: 1.0/49.0,
        winningOdds: 42.5,
        drawProbability: 0/49.0,
        drawOdds: 1.0,
        lossOdds: 0.0,
        income: 1.0,
        rebatePct: 0.1,
        commissionPct: 0.01,
      },
      {
        _id: 'SNLargeSmall',
        game: 'SNLargeSmall',
        winningProbability: 24.0/49.0,
        winningOdds: 1.97,
        drawProbability: 1.0/49.0,
        drawOdds: 1.0,
        lossOdds: 0.0,
        income: 1.0,
        rebatePct: 0.0,
        commissionPct: 0.01,
      },
    ],
  },
};

module.exports = config;
