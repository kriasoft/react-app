import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import store from './core/store';
import history from './core/history';
import routes from './routes';

const App = () => (
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
);

export default App;
