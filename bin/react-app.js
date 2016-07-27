#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
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
  } else {
    fs.createReadStream(src).pipe(fs.createWriteStream(dest));
  }
}

function scaffold() {
  // Copy template files
  console.log('Scaffolding a new JavaScript application project.');
  copy(path.resolve(__dirname, '../template'), process.cwd());
  // Install NPM modules
  console.log('Installing npm modules. This may take a couple minutes.');
  console.log();
  const npm = /^win/.test(process.platform) ? 'npm.cmd' : 'npm';
  spawn(npm, ['install'], { stdio: ['ignore', 'inherit', 'inherit'] }).on('close', code => {
    if (code === 0) {
      console.log(`
All done! Now you can launch your app by running: npm start

For more information visit https://github.com/kriasoft/react-app
`);
      process.exit(0);
    } else {
      console.error(new Error('Failed to install npm packages.'));
    }
  });
}

switch (process.argv[2] /* command to run */) {
  case 'new':
    const files = fs.readdirSync(process.cwd());
    if (files.filter(x => x !== '.git').length) {
      console.log('The current directory is not empty.');
      readline.createInterface({ input: process.stdin, output: process.stdout });
      process.stdout.write('Are you sure you want to proceed? (Y/N)? ');
      process.stdin.once('keypress', (key, data) => {
        if (key === 'y' || key === 'Y') {
          console.log();
          scaffold();
        } else {
          process.exit(0);
        }
      });
    } else {
      scaffold();
    }
    break;
  case 'build':
    var run = require('react-app-tools/run');
    Promise.resolve()
      .then(() => run('clean'))
      .then(() => run('bundle'));
    break;
  case 'run':
  case 'start':
    var run = require('react-app-tools/run');
    Promise.resolve()
      .then(() => run('clean'))
      .then(() => run('run'));
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
