import { createSelector } from 'reselect';
import {
  selectGlobal,
} from '../App/selectors';
import {
  selectGameSettings,
} from '../Settings/selectors';
import {
  hasDraw,
} from './games';
import {
  sumBy,
  groupBy,
  keys,
  map,
  minBy,
  meanBy,
  maxBy,
  concat,
  get,
  chain,
  range,
  toInteger,
  isEmpty,
  mapValues,
  indexOf,
  isArray,
  assign,
} from 'lodash';


const selectDrawState = () => (state) => state.get('draw');
const selectCurrentDrawId = () => createSelector(
  selectDrawState(),
  (draw) => draw.get('currentDrawId'),
)

const selectCurrentDraw = () => createSelector(
  selectCurrentDrawId(),
  selectGlobal(),
  (drawId, gState) => gState.getIn(['draws', drawId]),
);

const selectNewBet = () => createSelector(
  selectDrawState(),
  (draw) => draw.get('newBet').toJS(),
);

const selectBetAmount = () => createSelector(
  selectNewBet(),
  (newBet) => newBet.betAmount,
);

const selectGameType = () => createSelector(
  selectNewBet(),
  (newBet) => newBet.gameType,
);

const selectBetOn = () => createSelector(
  selectNewBet(),
  (newBet) => newBet.betOn,
);


const selectBets = () => createSelector(
  selectDrawState(),
  (draw) => draw.get('bets').toArray(),
);


const selectBetsSummary = () => createSelector(
  selectBets(),
  (bets) => {
    const groupKey = 'gameType';
    const valueKey = 'betAmount';
    const gBetAmt = groupBy(bets, groupKey);
    return concat({
      groupBy: 'OverAll',
      sum: sumBy(bets, valueKey),
      count: bets.length,
      min: get(minBy(bets, valueKey), valueKey),
      mean: meanBy(bets, valueKey),
      max: get(maxBy(bets, valueKey), valueKey),
    },map(keys(gBetAmt), (k) => ({
      groupBy: k,
      sum: sumBy(gBetAmt[k], valueKey),
      count: gBetAmt[k].length,
      min: get(minBy(gBetAmt[k], valueKey), valueKey),
      mean: meanBy(gBetAmt[k], valueKey),
      max: get(maxBy(gBetAmt[k], valueKey), valueKey),
    })));
  }
);

// Sum all bets by groupping by gameType and bet number
const selectBetSum = () => createSelector(
  selectBets(),
  (bets) => chain(bets)
    .groupBy('gameType')
    .mapValues((bs) =>
      chain(bs)
        .reduce((expended, b) => {
          if (isArray(b.betOn)) {
            return concat(expended,
              map(b.betOn, (num) => ({
                betOn: num,
                betAmount: b.betAmount,
              }))
            );
          }
          return expended.push(b);
        }, [])
        .groupBy('betOn')
        .mapValues((v) => sumBy(v, 'betAmount'))
        .value()
    ).value()
);


const selectProfitLossPerGame = () => createSelector(
  selectBets(),
  selectBetSum(),
  selectGameSettings(),
  (bets, betSum, settings) => mapValues(betSum, (bet, key) => {
    const totalBetAmount = chain(bets).filter((b) => b.game === key)
      .sumBy('betAmount');
    const game = chain(settings)
      .reduce((p, n) => n.game === key ? p = n : p).value();
    const draws = hasDraw(key);
    // filter the number for draw
    const remainningUnbettedNumber = chain(range(1, 50))
      .differenceBy(map(bet, (v, k) => k), toInteger)
      .filter((n) => Boolean(draws) || indexOf(draws, n) === -1).value();
    return {
      game: key,
      profitLossWin: assign(
        chain(bet).mapValues((v, k) =>
          v * game.winningProfit + (totalBetAmount - v) * game.lossProfit
        ).value(),
        !Boolean(draws) ? {} :
          chain(draws).reduce((d, n) => {
            d[n] = totalBetAmount * game.drawProfit;
            return d;
          }, {}),
      ),
      profitLossLoss: {
        unBettedNumbers: remainningUnbettedNumber,
        profit: isEmpty(remainningUnbettedNumber) ? 0 :
          totalBetAmount * game.lossProfit,
      },
    };
  })
);

const selectProfitLossPerNumSum = () => createSelector(
  selectProfitLossPerGame(),
  (perGame) => chain(range(1, 50)).map((num) =>
    chain(perGame).reduce((result, game, gameKey) => {
      result.num = num;
      if (typeof result.sum === 'undefined')
        result.sum = 0;
      if (indexOf(game.profitLossLoss.unBettedNumbers, toInteger(num)) >= 0) {
        result.sum += game.profitLossLoss.profit;
      } else {
        result.sum += game.profitLossWin[`${num}`];
      }
      return result;
    }, {}).value(),
  ).value(),
);

const selectProfitLoss = () => createSelector(
  selectProfitLossPerNumSum(),
  selectBets(),
  (perNumSum, bets) => {
    const totalBetAmount = sumBy(bets, 'betAmount');
    const expectedTotalProfit = chain(perNumSum).map((s) => s.sum).sum()
      .value() * (1 / 49);
    const expectedTotalProfitRate = totalBetAmount ? expectedTotalProfit / totalBetAmount : 0.0;
    const stdDev = Math.sqrt(chain(perNumSum).map((s) =>
        Math.pow(s.sum - expectedTotalProfit, 2) * (1 / 49)).sum().value());

    const above1SD = expectedTotalProfit - stdDev;
    const above1SDRate = totalBetAmount ? above1SD / totalBetAmount : 0.0;
    const above2SD = expectedTotalProfit - stdDev * 2;
    const above2SDRate = totalBetAmount ? above2SD / totalBetAmount : 0.0;
    return {
      expectedTotalProfit,
      expectedTotalProfitRate,
      stdDev,
      above1SD,
      above1SDRate,
      above2SD,
      above2SDRate,
    };
  },
);

const selectCapital = () => createSelector(
  selectDrawState(),
  (draw) => draw.get('capital'),
);

export {
  selectDrawState,
  selectCurrentDrawId,
  selectCurrentDraw,
  selectNewBet,
  selectBetOn,
  selectBetAmount,
  selectGameType,
  selectBets,
  selectBetsSummary,
  selectProfitLoss,
  selectCapital,
}
