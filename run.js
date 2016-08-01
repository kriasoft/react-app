/**
 * React App SDK (https://github.com/kriasoft/react-app)
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable no-console, global-require */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

/**
 * Find an automation script by its name. Given the following list of files:
 *
 *   ./node_modules/react-app-tools/scripts/build.js
 *   ./node_modules/react-app-tools/scripts/start.js
 *   ./scripts/start.js
 *
 * It should return:
 *
 *   findScript('build') => './node_modules/react-app-tools/scripts/build.js'
 *   findScript('start') => './scripts/start.js'
 *   findScript('foo')   => null
 */
const findScript = (() => {
  const files = [];
  return name => {
    if (!files.length) {
      try {
        files.push(...fs.readdirSync(path.join(process.cwd(), 'scripts'))
          .map(file => path.join(process.cwd(), 'scripts', file)));
      } catch (err) {
        if (process.env.VERBOSE === 'true') {
          console.log(`INFO: No scripts found in ${path.join(process.cwd(), 'scripts')}`);
        }
      }
      try {
        files.push(...fs.readdirSync(path.join(__dirname, 'scripts'))
          .map(file => path.join(path.join(__dirname, 'scripts', file))));
      } catch (err) {
        console.warn('WARNING: Cannot find \'react-app-tools\' npm module.');
      }
    }
    return files.find(x => path.basename(x) === `${name}.js`);
  };
})();


const findConfig = (() => {
  let config;
  return () => {
    if (config) return config;

    try {
      config = require(path.resolve(process.cwd(), './config.js'));
    } catch (err) {
      config = {};
    }

    const webpackConfig = require('./webpack.config');

    if (typeof config.webpack === 'function') {
      config.webpack = config.webpack(webpackConfig) || webpackConfig;
    } else {
      config.webpack = webpackConfig;
    }

    return config;
  };
})();

/**
 * Find and execute a script. For example: run('clean').then(() => console.log('Done!');
 *
 *   Starting 'clean'...
 *   Finished 'clean' after 45ms
 *   Done!
 */
function run(command) {
  const script = findScript(command);
  const config = findConfig();

  if (!script) {
    console.error(`ERROR: File not found: scripts/${command}.js`);
    process.exit(1);
  }

  const start = new Date();
  console.log(`Starting '${chalk.bold.gray(command)}'...`);

  return Promise.resolve().then(() => require(script)(config)).then(() => {
    console.log(
      `Finished '${chalk.bold.gray(command)}' after ` +
      `${chalk.bold(new Date().getTime() - start.getTime())}ms`
    );
  }, err => console.error(err.stack));
}

module.exports = run;
