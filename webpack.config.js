/**
 * React App SDK (https://github.com/kriasoft/react-app)
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */

const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const pkg = require(path.resolve(process.cwd(), './package.json'));

const debug = process.env.NODE_ENV === 'development';
const verbose = process.env.VERBOSE === 'true';
const hmr = process.env.HMR === 'true';

const babelConfig = Object.assign({}, pkg.babel, {
  babelrc: false,
  cacheDirectory: hmr,
});

// Webpack configuration (main.js => public/dist/main.{hash}.js)
// http://webpack.github.io/docs/configuration.html
const config = {

  // The base directory for resolving the entry option
  context: process.cwd(),

  // The entry point for the bundle
  entry: [
    /* The main entry point of your JavaScript application */
    './main.js',
  ],

  // Options affecting the output of the compilation
  output: {
    path: path.resolve(process.cwd(), './public/dist'),
    publicPath: '/dist/',
    filename: debug ? '[name].js?[hash]' : '[name].[hash].js',
    chunkFilename: debug ? '[id].js?[chunkhash]' : '[id].[chunkhash].js',
    sourcePrefix: '  ',
  },

  // Switch loaders to debug or release mode
  debug,

  // Developer tool to enhance debugging, source maps
  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: debug ? 'source-map' : false,

  // What information should be printed to the console
  stats: {
    colors: true,
    reasons: debug,
    hash: verbose,
    version: verbose,
    timings: true,
    chunks: verbose,
    chunkModules: verbose,
    cached: verbose,
    cachedAssets: verbose,
  },

  // The list of plugins for Webpack compiler
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': debug ? '"development"' : '"production"',
      __DEV__: debug,
    }),
    // Emit a JSON file with assets paths
    // https://github.com/sporto/assets-webpack-plugin#options
    new AssetsPlugin({
      path: path.resolve(process.cwd(), './public/dist'),
      filename: 'assets.json',
      prettyPrint: true,
    }),
  ],

  // Options affecting the normal modules
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(process.cwd(), './actions'),
          path.resolve(process.cwd(), './components'),
          path.resolve(process.cwd(), './core'),
          path.resolve(process.cwd(), './pages'),
          path.resolve(process.cwd(), './routes'),
          path.resolve(process.cwd(), './main.js'),
        ],
        loader: `babel-loader?${JSON.stringify(babelConfig)}`,
      },
      {
        test: /\.css/,
        loaders: [
          'style-loader',
          `css-loader?${JSON.stringify({
            sourceMap: debug,
            // CSS Modules https://github.com/css-modules/css-modules
            modules: true,
            localIdentName: debug ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
            // CSS Nano http://cssnano.co/options/
            minimize: !debug,
          })}`,
          'postcss-loader',
        ],
      },
      {
        test: /\.json$/,
        exclude: [
          path.resolve(process.cwd(), './routes.json'),
        ],
        loader: 'json-loader',
      },
      {
        test: /\.json$/,
        include: [
          path.resolve(process.cwd(), './routes.json'),
        ],
        loaders: [
          `babel-loader?${JSON.stringify(babelConfig)}`,
          path.resolve(process.cwd(), './utils/routes-loader.js'),
        ],
      },
      {
        test: /\.md$/,
        loader: path.resolve(process.cwd(), './utils/markdown-loader.js'),
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader?limit=10000',
      },
      {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file-loader',
      },
    ],
  },

  // The list of plugins for PostCSS
  // https://github.com/postcss/postcss
  postcss(bundler) {
    return [
      // Transfer @import rule by inlining content, e.g. @import 'normalize.css'
      // https://github.com/postcss/postcss-import
      require('postcss-import')({ addDependencyTo: bundler }),
      // W3C variables, e.g. :root { --color: red; } div { background: var(--color); }
      // https://github.com/postcss/postcss-custom-properties
      require('postcss-custom-properties')(),
      // W3C CSS Custom Media Queries, e.g. @custom-media --small-viewport (max-width: 30em);
      // https://github.com/postcss/postcss-custom-media
      require('postcss-custom-media')(),
      // CSS4 Media Queries, e.g. @media screen and (width >= 500px) and (width <= 1200px) { }
      // https://github.com/postcss/postcss-media-minmax
      require('postcss-media-minmax')(),
      // W3C CSS Custom Selectors, e.g. @custom-selector :--heading h1, h2, h3, h4, h5, h6;
      // https://github.com/postcss/postcss-custom-selectors
      require('postcss-custom-selectors')(),
      // W3C calc() function, e.g. div { height: calc(100px - 2em); }
      // https://github.com/postcss/postcss-calc
      require('postcss-calc')(),
      // Allows you to nest one style rule inside another
      // https://github.com/jonathantneal/postcss-nesting
      require('postcss-nesting')(),
      // W3C color() function, e.g. div { background: color(red alpha(90%)); }
      // https://github.com/postcss/postcss-color-function
      require('postcss-color-function')(),
      // Convert CSS shorthand filters to SVG equivalent, e.g. .blur { filter: blur(4px); }
      // https://github.com/iamvdo/pleeease-filters
      require('pleeease-filters')(),
      // Generate pixel fallback for "rem" units, e.g. div { margin: 2.5rem 2px 3em 100%; }
      // https://github.com/robwierzbowski/node-pixrem
      require('pixrem')(),
      // W3C CSS Level4 :matches() pseudo class, e.g. p:matches(:first-child, .special) { }
      // https://github.com/postcss/postcss-selector-matches
      require('postcss-selector-matches')(),
      // Transforms :not() W3C CSS Level 4 pseudo class to :not() CSS Level 3 selectors
      // https://github.com/postcss/postcss-selector-not
      require('postcss-selector-not')(),
      // Add vendor prefixes to CSS rules using values from caniuse.com
      // https://github.com/postcss/autoprefixer
      require('autoprefixer')(),
    ];
  },

};

// Optimize the bundle in release (production) mode
if (!debug) {
  config.plugins.push(new webpack.optimize.DedupePlugin());
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      screw_ie8: true,
      warnings: verbose,
    },
    mangle: {
      screw_ie8: true,
    },
    output: {
      comments: false,
      screw_ie8: true,
    },
  }));
  config.plugins.push(new webpack.optimize.AggressiveMergingPlugin());
}

// Hot Module Replacement (HMR) + React Hot Reload
if (hmr) {
  babelConfig.plugins.unshift('react-hot-loader/babel');
  config.entry.unshift('react-hot-loader/patch', 'webpack-hot-middleware/client');
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new webpack.NoErrorsPlugin());
}

module.exports = config;
