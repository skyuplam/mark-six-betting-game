import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';

import homeSagas from './containers/HomePage/sagas';
import drawSagas from './containers/Draw/sagas';
import settingsSagas from './containers/Settings/sagas';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, history) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    sagaMiddleware,
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers)
  );

  // Extensions
   homeSagas.map(sagaMiddleware.run);
   drawSagas.map(sagaMiddleware.run);
   settingsSagas.map(sagaMiddleware.run);

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () =>
      require.ensure([], (require) =>
        Promise.all([require('./reducers')])
          .then(([reducerModule]) => {
            const createReducers = reducerModule.default;
            const nextReducers = createReducers(store.asyncReducers);

            store.replaceReducer(nextReducers);
          })
      )
    );
  }

  return store;
}
