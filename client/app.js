import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import BaseApp from './containers/App';
import setAuthorizationToken from './helpers/setAuthorizationToken';

import reducers from './reducers';

const middleware = applyMiddleware(thunk);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(middleware),
);

setAuthorizationToken(localStorage.jwtToken);

const App = () => (
  <Router>
    <BaseApp />
  </Router>
);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />,
    </Provider>,
    document.getElementById('root')
  );
};

render();

if (module.hot) {
  module.hot.accept('./routes/Routes', () => {
    render();
  });
}
