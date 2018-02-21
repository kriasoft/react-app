/**
 * Copyright © 2016-present Kriasoft. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const paths = require('react-scripts/config/paths');

const { appPath, appSrc } = paths;
const serverBuild = paths.serverBuild || paths.appBuild;

module.exports = Object.assign(paths, {
  serverBuild,
  serverBuildAppJs: path.join(serverBuild, 'app.js'),
  appBuild: path.join(serverBuild, 'public'),
  appIndexJs: path.join(appSrc, 'app.browser.js'),
  override: path.join(appPath, 'override.js'),
  appEntry: path.join(appSrc, 'app.node.js'),
  serverEntry: path.join(appSrc, 'server.js'),
  assets: path.join(serverBuild, 'assets.json'),
});
