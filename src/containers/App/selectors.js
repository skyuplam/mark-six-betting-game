import {
  createSelector,
} from 'reselect';

const selectGlobal = () => (state) => state.get('global');

const selectShowMenu = () => createSelector(
  selectGlobal(),
  (gState) => gState.get('showMenu'),
);

const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

const selectDraws = () => createSelector(
  selectGlobal(),
  (gState) => gState.get('draws').toArray(),
);

export {
  selectLocationState,
  selectShowMenu,
  selectGlobal,
  selectDraws,
};
