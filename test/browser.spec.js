/**
 * React App (https://github.com/kriasoft/react-app)
 *
 * Copyright © 2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { expect } from 'chai';
import jsdom from 'mocha-jsdom';
import React from 'react';
import App from '../src/browser';
import createHistory from 'history/lib/createMemoryHistory';
import useQueries from 'history/lib/useQueries';

describe('browser', () => {

  jsdom({
    useEach: true,
    html: '<!doctype html><html><head><meta charset="utf-8"></head>' +
          '<body><div id="app"></div></body></html>',
  });


  it('test', (done) => {
    const container = document.getElementById('app');
    const history = useQueries(createHistory)();
    const routes = {
      path: '/',
      action: () => ({
        title: 'Test',
        component: () => <h1>Test</h1>,
      }),
    };
    App.create({
      routes,
      history,
      container,
      onRenderComplete() {
        expect(document.body.innerHTML).to.be.equal(
          '<div id="app"><h1 data-reactroot="">Test</h1></div>'
        );
        done();
      },
    });
  });

});
