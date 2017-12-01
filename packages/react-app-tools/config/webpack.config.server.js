/**
 * Copyright © 2016-present Kriasoft. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

const nodeExternals = require('webpack-node-externals');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const paths = require('./paths');

module.exports = config =>
  Object.assign({}, config, {
    name: 'server',
    target: 'node',
    node: false,

    entry: {
      app: paths.appEntry,
      server: paths.serverEntry,
    },

    output: Object.assign({}, config.output, {
      path: paths.serverBuild,
      filename: '[name].js',
      libraryTarget: 'commonjs2',
    }),

    // Modify babel-preset-react-app settings
    module: Object.assign({}, config.module, {
      rules: config.module.rules.map(x => {
        if (x.oneOf) {
          return Object.assign({}, x, {
            oneOf: x.oneOf.map(y => {
              if (y.use) {
                if (y.use[0] === require.resolve('style-loader')) {
                  return Object.assign({}, y, {
                    use: y.use.slice(1),
                  });
                }
                return Object.assign({}, y, {
                  use: y.use.map(z => {
                    if (
                      z.options &&
                      z.options.presets &&
                      z.options.presets[0] ===
                        require.resolve('babel-preset-react-app')
                    ) {
                      return Object.assign({}, z, {
                        options: Object.assign({}, z.options, {
                          // presets: [path.join(__dirname, 'babel-preset.js')],
                          compact: false,
                        }),
                      });
                    }
                    return z;
                  }),
                });
              }
              return y;
            }),
          });
        }
        return x;
      }),
    }),

    // Remove plugins that are not needed in the server-side bundle
    plugins: config.plugins.filter(
      x =>
        !(
          x instanceof InterpolateHtmlPlugin ||
          x instanceof HtmlWebpackPlugin ||
          x instanceof UglifyJsPlugin ||
          x instanceof SWPrecacheWebpackPlugin
        )
    ),

    externals: [nodeExternals()],
  });
