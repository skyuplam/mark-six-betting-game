const config = {
  version: '1.0.0',
  db: {
    betting: {},
    draw: {},
    settings: [
      {
        _id: 'SNE',
        game: 'SNE',
        winningOdds: 48.0,
        drawOdds: 1.0,
        loseOdds: 0.0,
        income: 1.0,
        rebatePct: 0.0,
        commissionPct: 0.01,
      },
      {
        _id: 'SNA',
        game: 'SNA',
        winningOdds: 42.5,
        drawOdds: 1.0,
        loseOdds: 0.0,
        income: 1.0,
        rebatePct: 0.1,
        commissionPct: 0.01,
      },
      {
        _id: 'SNLargeSmall',
        game: 'SNLargeSmall',
        winningOdds: 42.5,
        drawOdds: 1.0,
        loseOdds: 0.0,
        income: 1.0,
        rebatePct: 0.1,
        commissionPct: 0.01,
      },
    ],
  },
};

module.exports = config;
