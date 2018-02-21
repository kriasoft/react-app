/**
 * Copyright © 2016-present Kriasoft. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./config/paths');

// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve('react-scripts/config/paths')];
delete require.cache[require.resolve('./config/paths')];

const override = fs.existsSync(paths.override) ? require(paths.override) : null;

function overrideBabel(config, options) {
  const newConfig = Object.assign({}, config);

  if (options.target === 'node') {
    newConfig.compact = false;
  }

  return override && typeof override.babel === 'function'
    ? override.babel(newConfig, options)
    : newConfig;
}

module.exports = function customize(name, config, options) {
  const newConfig = Object.assign({}, config, {
    // Remove HtmlWebpackPlugin
    plugins: config.plugins.filter(x => !(x instanceof HtmlWebpackPlugin)),

    // Find Babel config
    module: Object.assign({}, config.module, {
      rules: config.module.rules.map(
        x =>
          x.oneOf
            ? Object.assign({}, x, {
                oneOf: x.oneOf.map(
                  y =>
                    y.use
                      ? Object.assign({}, y, {
                          use: y.use.map(
                            z =>
                              z.loader === require.resolve('babel-loader') &&
                              z.options.presets[0] ===
                                require.resolve('babel-preset-react-app')
                                ? Object.assign({}, z, {
                                    options: overrideBabel(z.options, options),
                                  })
                                : z
                          ),
                        })
                      : y
                ),
              })
            : x
      ),
    }),
  });

  return override && typeof override[name] === 'function'
    ? override[name](newConfig, options)
    : newConfig;
};
