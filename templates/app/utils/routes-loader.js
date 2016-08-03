/**
 * React App SDK (https://github.com/kriasoft/react-app)
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const toRegExp = require('path-to-regexp');

/**
 * Converts application routes from JSON to JavaScript. For example, a route like
 *
 *   {
 *     "path": "/about",
 *     "component": "./routes/About"
 *   }
 *
 * becomes
 *
 *   {
 *     path: '/about',
 *     pattern: /^\\/about(?:\/(?=$))?$/i,
 *     keys: [],
 *     component: './routes/About',
 *     load: function () { return new Promise(resolve => require(['./routes/About'], resolve)); }
 *   }
 */
module.exports = function routesLoader(source) {
  this.cacheable();

  const output = ['[\n'];
  const routes = JSON.parse(source);

  for (const route of routes) {
    const keys = [];
    const pattern = toRegExp(route.path, keys);
    const require = route.chunk && route.chunk === 'main' ?
      module => `Promise.resolve(require(${JSON.stringify(module)}).default)` :
      module => `new Promise(function (resolve, reject) {
        try {
          require.ensure([${JSON.stringify(module)}], function (require) {
            resolve(require(${JSON.stringify(module)}).default);
          }${typeof route.chunk === 'string' ? `, ${JSON.stringify(route.chunk)}` : ''});
        } catch (err) {
          reject(err);
        }
      })`;
    output.push('  {\n');
    for (const key of Object.keys(route)) {
      output.push(`    ${key}: ${JSON.stringify(route[key])},\n`);
    }
    output.push(`    pattern: ${pattern.toString()},\n`);
    output.push(`    keys: ${JSON.stringify(keys)},\n`);
    output.push(`    load() {\n      return ${require(route.component)};\n    },\n`);
    output.push('  },\n');
  }

  output.push(']');

  return `module.exports = ${output.join('')};`;
};
