/**
 * React App (https://github.com/kriasoft/react-app)
 *
 * Copyright © 2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import useQueries from 'history/lib/useQueries';
import { match } from 'universal-router';
import withContext from './withContext';

function createApp({ routes, history, context, container, onRenderComplete }) {
  if (!history) {
    history = useQueries(createBrowserHistory)(); // eslint-disable-line no-param-reassign
  }

  return history.listen(async (location) => {
    let result;
    const ctx = {
      path: location.pathname,
      query: location.query,
      hash: location.hash,
      history,
      ...(context instanceof Function ? context(location) : context),
    };
    try {
      result = await match(routes, ctx);

      // Handle redirect
      if (result && (result.status === 301 || result.status === 302)) {
        location.push(result.content);
        return;
      }

      if (result && result.component) {
        await new Promise((resolve, reject) => {
          try {
            ReactDOM.render(withContext({
              /* eslint-disable no-underscore-dangle */
              insertCss: styles => styles._insertCss(),
              /* eslint-enable no-underscore-dangle */
              ...ctx,
            }, React.createElement(result.component, result.props)), container, () => {
              document.title = result.title || '';
              resolve();
            });
          } catch (err) {
            reject(err);
          }
        });
        if (onRenderComplete) {
          onRenderComplete();
        }
      } else {
        const error = new Error('Not found');
        error.status = 404;
        throw error;
      }
    } catch (error) {
      error.status = error.status || 500;
      try {
        result = await match(routes, {
          ...ctx,
          canonicalPath: location.pathname,
          path: '/error',
          error,
        });
        if (result && result.component) {
          await new Promise((resolve, reject) => {
            try {
              ReactDOM.render(withContext({
                /* eslint-disable no-underscore-dangle */
                insertCss: styles => styles._insertCss(),
                /* eslint-enable no-underscore-dangle */
                ...ctx,
              }, React.createElement(result.component, result.props)), container, () => {
                document.title = result.title || '';
                resolve();
              });
            } catch (err) {
              reject(err);
            }
          });
        }
      } catch (err) {
        console.error(err.stack); // eslint-disable-line no-console
        throw err;
      }
      console.error(error.stack); // eslint-disable-line no-console
      throw error;
    }
  });
}

export default createApp;
