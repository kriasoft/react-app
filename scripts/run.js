/**
 * React App SDK (https://github.com/kriasoft/react-app)
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const webpack = require('webpack');
const chalk = require('chalk');
// const WebpackDevServer = require('webpack-dev-server');
const { spawn } = require('child_process');

const friendlySyntaxErrorLabel = 'Syntax error:';

function isLikelyASyntaxError(message) {
  return message.indexOf(friendlySyntaxErrorLabel) !== -1;
}

function formatMessage(message) {
  return message
    // Make some common errors shorter:
    .replace(
      // Babel syntax error
      'Module build failed: SyntaxError:',
      friendlySyntaxErrorLabel
    )
    .replace(
      // Webpack file not found error
      /Module not found: Error: Cannot resolve 'file' or 'directory'/,
      'Module not found:'
    )
    // Internal stacks are generally useless so we strip them
    .replace(/^\s*at\s.*:\d+:\d+[\s\)]*\n/gm, '') // at ... ...:x:y
    // Webpack loader names obscure CSS filenames
    .replace('./~/css-loader!./~/postcss-loader!', '');
}

function openElectronApp() {
  const child = spawn('electron', ['./app/electron.main.js', '--enable-logs']);
  const prefix = 'electron> ';
  child.stdout.on('data', (data) => {
    console.log(chalk.blue(
      prefix + data.toString().replace(/\n$/g, '').split('\n').join(`\n ${prefix}`)
    ));
  });
  child.stderr.on('data', (data) => {
    console.error(chalk.red(
      prefix + data.toString().replace(/\n$/g, '').split('\n').join(`\n ${prefix}`)
    ));
  });
  child.on('close', (code) => {
    console.log(chalk.yellow(`Electron exited with status ${code}`));
    process.exit(code);
  });
  child.on('error', (error) => {
    console.log(chalk.red(`Error launching electron:\n ${error}`));
  });
}

module.exports = config => (
  new Promise(resolve => {
    let count = 0;
    const compiler = webpack(config.webpack);
    compiler.plugin('invalid', () => {
      console.log('Compiling...');
    });
    compiler.plugin('done', (stats) => {
      // Error handling with webpack
      const hasErrors = stats.hasErrors();
      const hasWarnings = stats.hasWarnings();
      if (!hasErrors && !hasWarnings) {
        console.log(chalk.green('Compiled successfully!'));
        console.log();
        console.log('The app is running at http://localhost:3000/');
        console.log();
      }

      const json = stats.toJson();
      let formattedErrors = json.errors.map(message =>
        `Error in ${formatMessage(message)}`
      );
      const formattedWarnings = json.warnings.map(message =>
        `Warning in ${formatMessage(message)}`
      );

      if (hasErrors) {
        console.log(chalk.red('Failed to compile.'));
        console.log();
        if (formattedErrors.some(isLikelyASyntaxError)) {
          // If there are any syntax errors, show just them.
          // This prevents a confusing ESLint parsing error
          // preceding a much more useful Babel syntax error.
          formattedErrors = formattedErrors.filter(isLikelyASyntaxError);
        }
        formattedErrors.forEach(message => {
          console.log(message);
          console.log();
        });
        // If errors exist, ignore warnings.
        return;
      }

      if (hasWarnings) {
        console.log(chalk.yellow('Compiled with warnings.'));
        console.log();
        formattedWarnings.forEach(message => {
          console.log(message);
          console.log();
        });

        console.log('You may use special comments to disable some warnings.');
        console.log(`Use ${chalk.yellow('// eslint-disable-next-line')} to ignore the next line.`);
        console.log(
          `Use ${chalk.yellow('/* eslint-disable */')} to ignore all warnings in a file.`
        );
      }

      // Start electron after first complie
      if (++count === 1) {
        console.log(chalk.cyan('Starting electron...'));
        openElectronApp();
      }
    });

    // Start dev server with webpack dev and hot middleware
    const express = require('express');
    const devMiddleware = require('webpack-dev-middleware');
    const hotMiddleware = require('webpack-hot-middleware');

    const app = express();

    app.use(devMiddleware(compiler, {
      publicPath: config.webpack.output.publicPath,
      stats: config.webpack.stats,
    }));

    app.use(hotMiddleware(compiler));

    app.listen(3000, (err) => {
      if (err) {
        console.error(err);
      }

      console.log(chalk.cyan(
        'Development server listening at http://localhost:3000/'
      ));

      resolve();
    });
  })
);
