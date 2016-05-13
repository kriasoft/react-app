/**
 * React App (https://github.com/kriasoft/react-app)
 *
 * Copyright © 2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import ReactDOM from 'react-dom/server';
import { createMemoryHistory, useQueries } from 'history';
import { match } from 'universal-router';
import withContext from './withContext';
import Html from './Html';

function render(template, component, context, actionResult) {
  const css = [];
  const content = ReactDOM.renderToString(withContext({
    insertCss: styles => css.push(styles._getCss()), // eslint-disable-line
    ...context,
  }, component));
  return content && `<!doctype html>\n${ReactDOM.renderToStaticMarkup(
      React.createElement(template || Html, {
        /* start: default values */
        lang: '',
        title: '',
        description: '',
        meta: [],
        bundle: '/main.js',
        css: css.join(''),
        /* end: default values */
        context,
        ...actionResult,
        content,
      })
    )}`;
}

function createApp({ routes, context, template } = {}) {
  return async (req, res, next) => {
    let result;
    let html;
    let ctx;
    try {
      ctx = {
        path: req.path,
        query: req.query,
        hash: null,
        history: useQueries(createMemoryHistory)(req.originalUrl),
        ...(context instanceof Function ? context(req) : context),
      };

      result = await match(routes, ctx);

      // Handle redirect
      if (result && (result.status === 301 || result.status === 302)) {
        res.redirect(result.status, result.content);
        return;
      }

      // Render React component
      if (result && result.component) {
        html = render(template, React.createElement(result.component, result.props), ctx, result);
      }

      if (!html) {
        const error = new Error('Not found');
        error.status = 404;
        throw error;
      }

      res.status(result.status || 200).send(html);
    } catch (error) {
      error.status = error.status || 500;
      try {
        result = await match(routes, { ...ctx, canonicalPath: req.path, path: '/error', error });

        if (result && result.component) {
          html = render(template, React.createElement(result.component, result.props), ctx, result);
        }

        if (html) {
          res.status(error.status).send(html);
        } else {
          next(error);
        }
      } catch (err) {
        next(err);
      }
    }
  };
}

export default createApp;
