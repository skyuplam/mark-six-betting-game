import { createSelector } from 'reselect';
import {
  selectGlobal,
} from '../App/selectors';
import {
  sumBy,
  groupBy,
  keys,
  map,
  minBy,
  meanBy,
  maxBy,
  concat,
  get
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

const selectGameType = () => createSelector(
  selectNewBet(),
  (newBet) => newBet.gameType,
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

export {
  selectDrawState,
  selectCurrentDrawId,
  selectCurrentDraw,
  selectNewBet,
  selectGameType,
  selectBets,
  selectBetsSummary,
}
