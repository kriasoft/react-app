/**
 * Copyright © 2016-present Kriasoft. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

const createConfig = require('react-scripts/config/webpackDevServer.config');
const paths = require('./paths');

module.exports = function(proxy, allowedHost) {
  const config = createConfig(proxy, allowedHost);
  return Object.assign(config, {
    historyApiFallback: false,
    setup(app) {
      app.get('/', (req, res, next) => {
        global.appPromise
          .then(() => {
            const app = require(paths.serverBuildAppJs).default;
            app.handle(req, res);
          })
          .catch(next);
      });
    },
    after(app) {
      app.get('*', (req, res, next) => {
        global.appPromise
          .then(() => {
            const app = require(paths.serverBuildAppJs).default;
            app.handle(req, res);
          })
          .catch(next);
      });
    },
  });
};
