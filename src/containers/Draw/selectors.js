import { createSelector } from 'reselect';
import {
  selectGlobal,
} from '../App/selectors';

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


export {
  selectDrawState,
  selectCurrentDrawId,
  selectCurrentDraw,
  selectNewBet,
  selectGameType,
}
