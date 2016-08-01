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
const { spawn } = require('child_process');

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
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (exists && isDirectory) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest);
    const tasks = [];
    fs.readdirSync(src).forEach(childPath => {
      tasks.push(copy(path.join(src, childPath), path.join(dest, childPath)));
    });
    return Promise.all(tasks);
  }

  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(src);
    readStream.on('error', reject);
    const writeStream = fs.createWriteStream(dest);
    writeStream.on('error', reject);
    writeStream.on('finish', resolve);
    readStream.pipe(writeStream);
  });
}

module.exports = () => Promise.resolve()
  .then(() => copy(path.resolve(__dirname, '../templates/app'), process.cwd()))
  .then(() => install('--production'))
  .then(() => {
    console.log();
    console.log('All done! Now you can launch your app by running: npm start');
    console.log();
    console.log('For more information visit https://github.com/kriasoft/react-app');
    console.log();
  });
