#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');
const cwd = process.cwd();

function copy(src, dest) {
  var exists = fs.existsSync(src);
  var stats = exists && fs.statSync(src);
  var isDirectory = exists && stats.isDirectory();
  if (exists && isDirectory) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest);
    fs.readdirSync(src).forEach(childPath => {
      copy(path.join(src, childPath), path.join(dest, childPath));
    });
  }
}

switch (process.argv[2] /* command to run */) {
  case 'new':
    copy(path.resolve(__dirname, '../template'), process.cwd());
    // Install npm modules
    console.log('Installing NPM modules. This may take a couple minutes');
    const npm = /^win/.test(process.platform) ? 'npm.cmd' : 'npm';
    spawn(npm, ['install'], { stdio: ['ignore', 'inherit', 'inherit'] }).on('close', code => {
      if (code === 0) {
        console.log('\nAll done! Launch your app by running: npm start\n');
        execSync('cd', '..');
      } else {
        console.error(new Error('Failed to install npm packages.'));
      }
    });
    break;
  case 'build':
    var run = require('react-app-tools/run');
    Promise.resolve()
      .then(() => run('clean'))
      .then(() => run('bundle'));
    break;
  case 'start':
    var run = require('react-app-tools/run');
    Promise.resolve()
      .then(() => run('clean'))
      .then(() => run('start'));
    break;
  default:
    console.log(
      `Welcome to React Application Starter Kit!

Usage: react-app <command>

  react-app new    - Scaffold a new JavaScript application project
  react-app build  - Compile JavaScript application from source files
  react-app run    - Compile and launch the app

For more information visit:

  https://github.com/kriasoft/react-app
`
    );
}
