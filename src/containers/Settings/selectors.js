import { createSelector } from 'reselect';
import { assign } from 'lodash';
import math from 'mathjs';

const selectSettings = () => (state) => state.get('settings');

// TODO: Rewrite using partial function
const selectGameSettings = () => createSelector(
  selectSettings(),
  (settings) => settings.get('gameSettings').toArray().map(
    (g) => {
      const base = {
        lossProbability: 1 - (g.winningProbability + g.drawProbability),
        winningCost: g.winningProbability * g.winningOdds * g.income,
        drawCost: g.drawProbability * g.drawOdds,
      };
      const revenue = g.income - (g.rebatePct + base.winningCost + base.drawCost);
      const profit = revenue - g.commissionPct;
      const winningProfit = g.income - (g.winningOdds + g.rebatePct + g.commissionPct);
      const drawProfit = g.income - (g.drawOdds + g.rebatePct + g.commissionPct);
      const lossProfit = g.income - (g.lossOdds + g.rebatePct + g.commissionPct);

      const profitStd = math.sqrt((math.square(winningProfit - profit) * g.winningProbability)
      + (math.square(drawProfit - profit) * g.drawProbability)
      + (math.square(lossProfit - profit) * base.lossProbability));

      return assign(g, base, {
        revenue: revenue,
        profit: profit,
        winningProfit: winningProfit,
        drawProfit: drawProfit,
        lossProfit: lossProfit,
        profitStd: profitStd,
        profit1Std: profit - profitStd,
      });
    },
  ),
);

export {
  selectSettings,
  selectGameSettings,
};
