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
const readline = require('readline');
const { spawn } = require('child_process');
const pkg = require('./package.json');

if (process.argv.includes('--test-sdk')) {
  process.env.TEST_SDK = true;
  const tempDir = path.resolve(__dirname, '../temp');
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
  process.chdir(tempDir);
}

if (process.argv.includes('--verbose')) {
  process.env.VERBOSE = true;
}

function checkIfCurrentWorkingDirectoryIsEmpty() {
  return new Promise(resolve => {
    console.log(`Scaffolding a new JavaScript application in ${process.cwd()}`);

    // Check if the current directory is empty
    const files = fs.readdirSync(process.cwd());
    if (files.filter(x => x !== '.git').length) {
      console.log('The current directory is not empty.');
      const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
      process.stdout.write('Are you sure you want to proceed? (y/N)? ');
      process.stdin.once('keypress', key => {
        console.log();
        rl.close();
        if (key === 'y' || key === 'Y') {
          resolve();
        } else {
          process.exit(0);
        }
      });
    } else {
      resolve();
    }
  });
}

function installReactTools() {
  // Don't install react-app-tools in test mode
  if (process.env.TEST_SDK === 'true') {
    return Promise.resolve();
  }

  // Create an empty package.json file if it doesn't exist
  const filename = path.resolve(process.cwd(), 'package.json');
  try {
    fs.accessSync(filename, fs.F_OK);
  } catch (e) {
    fs.writeFileSync(filename, '{}', 'utf8');
  }

  return new Promise((resolve, reject) => {
    const tagMatch = pkg.version.match(/-([a-z]+)\./); // '1.0.0-beta.2' => 'beta'
    const module = tagMatch ? `react-app-tools@${tagMatch[1]}` : 'react-app-tools';
    console.log(`Installing '${module}' from npm... This may take a couple minutes.`);

    const npm = /^win/.test(process.platform) ? 'npm.cmd' : 'npm';
    const options = { stdio: ['ignore', 'inherit', 'inherit'] };

    spawn(npm, ['install', module, '--save-dev'], options).on('close', code => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Failed to install '${module}'.`));
      }
    });
  });
}

function run(command) {
  if (process.env.TEST_SDK === 'true') {
    // eslint-disable-next-line global-require
    return require(path.resolve(__dirname, '../run'))(command);
  }

  // eslint-disable-next-line global-require, import/no-unresolved
  return require(
    path.resolve(process.cwd(), './node_modules/react-app-tools/run')
  )(command);
}

switch (process.argv[2] /* command to run */) {
  case 'new':
    Promise.resolve()
      .then(() => checkIfCurrentWorkingDirectoryIsEmpty())
      .then(() => installReactTools())
      .then(() => (process.env.TEST_SDK === 'true'
          // eslint-disable-next-line global-require
          ? require(path.resolve(__dirname, '../scripts/new'))()
          // eslint-disable-next-line global-require, import/no-unresolved
          : require(path.resolve(process.cwd(), './node_modules/react-app-tools/scripts/new'))())
      )
      .catch(err => {
        console.error(err.stack);
        process.exit(1);
      });
    break;
  case 'build':
    run('build');
    break;
  case 'run':
  case 'start':
    run('start');
    break;
  default:
    console.log('  ____                 _        _                  ____  ____  _  __');
    console.log(' |  _ \\ ___  __ _  ___| |_     / \\   _ __  _ __   / ___||  _ \\| |/ /');
    console.log(' | |_) / _ \\/ _` |/ __| __|   / _ \\ | \'_ \\| \'_ \\  \\___ \\| | | | \' /');
    console.log(' |  _ <  __/ (_| | (__| |_   / ___ \\| |_) | |_) |  ___) | |_| | . \\');
    console.log(' |_| \\_\\___|\\__,_|\\___|\\__| /_/   \\_\\ .__/| .__/  |____/|____/|_|\\_\\');
    console.log('                                    |_|   |_|');
    console.log();
    console.log(' Usage: react-app <command> [options]');
    console.log();
    console.log(' Commands:');
    console.log();
    console.log('   new     - Scaffold a new JavaScript application project');
    console.log('   build   - Compile JavaScript application with Webpack');
    console.log('   run     - Compile and launch the app');
    console.log();
    console.log(' Options:');
    console.log();
    console.log('   -v, --version   - Print React App SDK version');
    console.log();
    console.log(' For more information visit:');
    console.log();
    console.log('   https://github.com/kriasoft/react-app');
}
