#!/usr/bin/env node

var fs = require('fs');

if (process.argv[2] === '-v' || process.argv[2] === '--version') {
  var pkg = JSON.parse(fs.readFileSync(require.resolve('../package.json'), 'utf8'));
  console.log('v' + pkg.version);
  process.exit(0);
}

if (process.versions.node.split('.')[0] < 6) {
  console.error('ERROR: This tool requires Node.js v6 or higher.');
  process.exit(1);
} else {
  require('../cli');
}
