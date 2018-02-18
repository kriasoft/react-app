/**
 * Copyright © 2016-present Kriasoft. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const paths = require('react-scripts/config/paths');

module.exports = Object.assign(paths, {
  serverBuild: paths.appBuild,
  serverBuildAppJs: path.join(paths.appBuild, 'app.js'),
  appBuild: path.join(paths.appBuild, 'public'),
  appIndexJs: `${paths.appIndexJs.slice(0, -8)}app.browser.js`,
  appEntry: `${paths.appIndexJs.slice(0, -8)}app.node.js`,
  serverEntry: `${paths.appIndexJs.slice(0, -8)}server.js`,
  assets: path.join(paths.appBuild, 'assets.json'),
});
