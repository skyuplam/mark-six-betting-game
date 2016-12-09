import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Import Language Provider
import LanguageProvider from './containers/LanguageProvider';

// Import i18n messages
import { translationMessages } from './i18n';


const initialState = {};
const store = configureStore(initialState);

const render = (messages) =>
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider>
        <LanguageProvider messages={messages}>
          <App />
        </LanguageProvider>
      </MuiThemeProvider>
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
