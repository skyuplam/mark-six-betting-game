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


export {
  selectDrawState,
  selectCurrentDrawId,
  selectCurrentDraw,
}
