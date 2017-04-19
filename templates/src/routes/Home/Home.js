/**
 * React App SDK (https://github.com/kriasoft/react-app)
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { Link } from 'react-router';
import Layout from '../../components/Layout';
import s from './Home.css';

const HomePage = () => (
  <Layout className={s.content}>
    <h1>Welcome!</h1>
    <p>
      This website is build with <a href="https://github.com/kriasoft/react-app">React App
      SDK</a> — CLI tools and templates for authoring React/Redux apps with just a single dev
      dependency and zero configuration. It is powered by popular front-end dev tools such
      as <a href="http://babeljs.io/">Babel</a>
      , <a href="https://webpack.github.io/">Webpack</a>
      , <a href="http://postcss.org/">PostCSS</a>
      , <a href="https://github.com/css-modules/css-modules">CSS Modules</a>
      , <a href="https://browsersync.io/">Browsersync</a>
      , <a href="https://webpack.github.io/docs/hot-module-replacement.html">HMR</a>
      , <a href="http://gaearon.github.io/react-hot-loader/">React Hot Loader</a>
      ; featuring component-based development approach, progressive enhancement,
      code splitting and async chunk loading, declarative routes, navigation, application
      state management and more.
    </p>
    <p>
      To learn more visit project's <a href="https://github.com/kriasoft/react-app">homepage</a>
      , <Link to="/get-started">getting started</Link> guide,
      join <a href="https://gitter.im/kriasoft/react-app">#react-app</a> chat room on Gitter to
      stay up to date.
    </p>
    <h2>Recent Articles</h2>
  </Layout>
);

export default HomePage;
