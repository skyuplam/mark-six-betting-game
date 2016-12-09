import { createSelector } from 'reselect';

const selectHome = () => (state) => state.get('home');

const selectDraw = ()  => createSelector(
  selectHome(),
  (home) => home.get('draw').toJS(),
);

export {
  selectHome,
  selectDraw,
};
