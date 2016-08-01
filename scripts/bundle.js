/**
 * React App SDK (https://github.com/kriasoft/react-app)
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const webpack = require('webpack');

module.exports = config => new Promise((resolve, reject) => {
  webpack(config.webpack).run((err, stats) => {
    if (err) {
      reject(err);
    } else {
      console.log(stats.toString(config.webpack.stats));
      resolve();
    }
  });
});
