#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

if (process.argv[2] === '-v' || process.argv[2] === '--version') {
  var filename = require.resolve('../package.json');
  var pkg = JSON.parse(fs.readFileSync(filename, 'utf8'));
  console.log('v' + pkg.version);
  process.exit(0);
}

if (process.versions.node.split('.')[0] < 6) {
  console.error('ERROR: This tool requires Node.js v6 or higher.');
  process.exit(1);
}

process.env.TEST_SDK = false;

for (var i = 0; i < process.argv.length; i++) {
  if (process.argv[i] === '--test-sdk') {
    process.env.TEST_SDK = true;
    var tempDir = path.resolve(__dirname, '../../temp');

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    process.chdir(tempDir);
  }
}

function run(command) {
  if (process.env.TEST_SDK) {
    // eslint-disable-next-line global-require
    return require(path.resolve(__dirname, '../../run'))(command);
  }

  // eslint-disable-next-line global-require, import/no-unresolved
  return require('react-app-tools/run')(command);
}

switch (process.argv[2] /* command to run */) {
  case 'new':
    if (process.env.TEST_SDK) {
      // eslint-disable-next-line global-require
      require(path.resolve(__dirname, '../../scripts/new'))();
    } else {
      // eslint-disable-next-line global-require, import/no-unresolved
      require('react-app-tools/scripts/new')();
    }
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
    console.log('   build   - Compile JavaScript application from source files');
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
