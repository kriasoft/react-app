import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Home from './Home';
import Error from './Error';
import GetStarted from './GetStarted';

export default (
  <Route path="/">
    <IndexRoute component={Home} />
    <Route path="/get-started" component={GetStarted} />
    <Route path="*" component={Error} />
  </Route>
);
