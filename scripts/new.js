/**
 * React App SDK (https://github.com/kriasoft/react-app)
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync, spawn } = require('child_process');

function install(...args) {
  return new Promise((resolve, reject) => {
    const npm = /^win/.test(process.platform) ? 'npm.cmd' : 'npm';
    const options = { stdio: ['ignore', 'inherit', 'inherit'] };
    spawn(npm, ['install', ...args], options).on('close', code => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error('Failed to install npm package(s).'));
      }
    });
  });
}

function copy(src, dest) {
  var exists = fs.existsSync(src);
  var stats = exists && fs.statSync(src);
  var isDirectory = exists && stats.isDirectory();
  if (exists && isDirectory) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest);
    const tasks = [];
    fs.readdirSync(src).forEach(childPath => {
      tasks.push(copy(path.join(src, childPath), path.join(dest, childPath)));
    });
    return Promise.all(tasks);
  } else {
    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(src);
      readStream.on('error', reject);
      const writeStream = fs.createWriteStream(dest);
      writeStream.on('error', reject);
      writeStream.on('finish', resolve);
      readStream.pipe(writeStream);
    });
  }
}

module.exports = () =>
  new Promise(resolve => {
    console.log(`Scaffolding a new project in ${process.cwd()}`);

    // Check if the current directory is empty
    const files = fs.readdirSync(process.cwd());
    if (files.filter(x => x !== '.git').length) {
      console.log('The current directory is not empty.');
      const rl = readline.createInterface({input: process.stdin, output: process.stdout});
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
  })
  .then(() => {
    // Create an empty package.json file
    fs.writeFileSync(path.resolve(process.cwd(), 'package.json'), '{}', 'utf8');

    // Install 'react-app-tools` npm module
    const package = process.env.TEST ? path.resolve(__dirname, '../') : 'react-app-tools';
    console.log(`Installing '${package}' from npm... This may take a couple minutes.`);
    console.log();
    return install(package, '--save-dev');
  })
  .then(() => copy(path.resolve(__dirname, '../templates/app'), process.cwd()))
  .then(() => install('--production'))
  .then(() => {
    console.log();
    console.log('All done! Now you can launch your app by running: npm start');
    console.log();
    console.log('For more information visit https://github.com/kriasoft/react-app');
    console.log();
  });
