/**
 * Copyright © 2016-present Kriasoft. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');
const path = require('path');

try {
  fs.mkdirSync(path.join(__dirname, '../bin'));
} catch (err) {
  if (err.code !== 'EEXIST') {
    throw err;
  }
}

function copy(from, to, fixes = []) {
  let source = fs.readFileSync(require.resolve(from), 'utf8');

  fixes.forEach(([find, replace]) => {
    if (
      (typeof find === 'string' && source.indexOf(find) === -1) ||
      (typeof find === 'object' && !source.match(find))
    ) {
      throw new Error(`Cannot find "${find}" in ${from}.`);
    }
    source = source.replace(find, replace);
  });

  fs.writeFileSync(path.resolve(__dirname, `../${to}`), source, 'utf8');
}

copy('react-scripts/bin/react-scripts.js', 'bin/react-app.js');

copy('react-scripts/scripts/build.js', 'scripts/build.js', [
  ['../config/env', 'react-scripts/config/env'],
  ['./utils/', 'react-scripts/scripts/utils/'],
  ["const paths = require('../config/paths');\n", ''],
  [
    "const config = require('../config/webpack.config.prod');",
    "const paths = require('../config/paths');\nconst config = require('../config/webpack.config.prod');\nconst configServer = require('../config/webpack.config.server')(config);",
  ],
  ['webpack(config)', 'webpack([config, configServer])'],
  ['(stats.toJson', '(stats.stats[0].toJson'],
  [/(resolve\({\n\s+)stats,/, '$1stats: stats.stats[0],'],
  [
    '[paths.appHtml, paths.appIndexJs]',
    '[paths.appIndexJs, paths.appEntry, paths.serverEntry]',
  ],
  [
    'printBrowsers(paths.appPath);',
    'printBrowsers(paths.appPath);\n    fs.outputJsonSync(paths.assets, stats.toJson({}, true).assetsByChunkName, { spaces: 2 });',
  ],
]);

copy('react-scripts/scripts/start.js', 'scripts/start.js', [
  ['../config/env', 'react-scripts/config/env'],
  ['./utils/', 'react-scripts/scripts/utils/'],
  ['react-dev-utils/WebpackDevServerUtils', '../WebpackDevServerUtils'],
  [
    "const config = require('../config/webpack.config.dev');",
    "const config = require('../config/webpack.config.dev');\nconst configServer = require('../config/webpack.config.server')(config);",
  ],
  ['webpack, config, appName', 'webpack, [config, configServer], appName'],
  [
    '[paths.appHtml, paths.appIndexJs]',
    '[paths.appIndexJs, paths.appEntry, paths.serverEntry]',
  ],
]);

copy('react-dev-utils/WebpackDevServerUtils.js', 'WebpackDevServerUtils.js', [
  [/'\.\//g, "'react-dev-utils/"],
  ["require('url');", "require('url');\nconst Module = require('module');"],
  [
    "require('react-dev-utils/getProcessForPort');",
    "require('react-dev-utils/getProcessForPort');\nconst paths = require('./config/paths');",
  ],
  [
    "console.log('Compiling...');",
    `console.log('Compiling...');

    global.appPromise = new Promise(resolve => {
      global.appPromiseResolve = resolve;
    });`,
  ],
  [
    '  });\n  return compiler;',
    `
    const assets = JSON.stringify(stats.stats[0].toJson({}, true).assetsByChunkName, null, '  ');
    fs.writeFileSync(paths.assets, assets, 'utf8');
    delete require.cache[paths.assets];
    delete require.cache[paths.serverBuildAppJs];
    global.appPromiseResolve();
  });\n  return compiler;`,
  ],
  [
    'let isFirstCompile = true;',
    `let isFirstCompile = true;

  global.appPromise = new Promise(resolve => {
    global.appPromiseResolve = resolve;
  });`,
  ],
]);
