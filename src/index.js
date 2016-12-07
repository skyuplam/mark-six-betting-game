import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';
import App from './containers/App';
import createRoutes from './routes';
import configureStore from './store';

// Import Language Provider
import LanguageProvider from './containers/LanguageProvider';

// Import i18n messages
import { translationMessages } from './i18n';


const initialState = {};
const store = configureStore(initialState, browserHistory);

import { selectLocationState } from './containers/App/selectors';
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: selectLocationState(),
});

const rootRoute = {
  component: App,
  childRoutes: createRoutes(store),
};

const render = (messages) =>
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <Router
          history={history}
          routes={rootRoute}
          render={
            applyRouterMiddleware(useScroll())
          }
        />
      </LanguageProvider>
    </Provider>,
    document.getElementById('root')
  );

// Hot reloadable translation json files
if (module.hot) {
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept('./i18n', () => {
    render(translationMessages);
  });
}

if (!window.Intl) {
  require.ensure([], (require) =>
    (new Promise((resolve) => {
      resolve(require('intl'));
    }))
      .then(() => Promise.all([
        require('intl/locale-data/jsonp/en.js'),
        require('intl/locale-data/jsonp/de.js'),
      ]))
      .then(() => render(translationMessages))
      .catch((err) => {
        throw err;
      })
  );
} else {
  render(translationMessages);
}
