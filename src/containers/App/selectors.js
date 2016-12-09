import {
  createSelector,
} from 'reselect';

const selectGlobal = () => (state) => state.get('global');

const selectShowMenu = () => createSelector(
  selectGlobal(),
  (gState) => gState.get('showMenu'),
);

const selectDraws = () => createSelector(
  selectGlobal(),
  (gState) => gState.get('draws').toArray(),
);

export {
  selectShowMenu,
  selectGlobal,
  selectDraws,
};
