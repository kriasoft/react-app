/**
 * Copyright © 2016-present Kriasoft. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('react-scripts/config/webpack.config.dev');

config.plugins = config.plugins.filter(x => !(x instanceof HtmlWebpackPlugin));

module.exports = config;
