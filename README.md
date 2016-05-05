# React App

[![NPM version](http://img.shields.io/npm/v/react-app.svg?style=flat-square)](https://www.npmjs.com/package/react-app)
[![NPM downloads](http://img.shields.io/npm/dm/react-app.svg?style=flat-square)](https://www.npmjs.com/package/react-app)
[![Build Status](http://img.shields.io/travis/kriasoft/react-app/master.svg?style=flat-square)](https://travis-ci.org/kriasoft/react-app)
[![Coverage Status](https://img.shields.io/coveralls/kriasoft/react-app.svg?style=flat-square)](https://coveralls.io/github/kriasoft/react-app)
[![Dependency Status](http://img.shields.io/david/kriasoft/react-app.svg?style=flat-square)](https://david-dm.org/kriasoft/react-app)
[![Online Chat](http://img.shields.io/badge/chat-%23react--starter--kit-blue.svg?style=flat-square)](https://gitter.im/kriasoft/react-starter-kit)

> React App is a small library powered by [React](https://facebook.github.io/react/) and [Universal
> Router](https://www.kriasoft.com/universal-router/) that handles routing, navigation and
> rendering logic in isomorphic (universal) and single-page applications.

### Getting Started

##### Step 1

Create `routes.js` file with the list of application routes, where each route is just a plain
JavaScript object that has `path`, `action` and optionally `children` properties. For example:

```js
import HomePage from './components/HomePage';
import NewsPage from './components/NewsPage';
import StoryPage from './components/StoryPage';

const routes = [
  {
    path: '/',           // www.example.com
    action() {
      return { title: 'Home', component: HomePage };
    }
  },
  {
    path: '/news',       // www.example.com/news
    children: [
      {
        path: '/',       // www.example.com/news
        async action() {
          const resp = await fetch('/api/news');
          const data = await resp.data();
          return { title: 'News', component: NewsPage, props: data };
        }
      },
      {
        path: '/:title', // www.example.com/news/some-title
        async action() {
          const resp = await fetch('/api/news');
          const data = await resp.data();
          return { title: data.title, component: StoryPage, props: data };
        }
      }
    ]
  },
];

export default routes;
```

For more information visit https://github.com/kriasoft/universal-router

##### Step 2

In the client-side code, launch your React app by running:

```js
import App from 'react-app';
import Redux from 'redux';
import routes from './routes';

App.create({
  routes,
  context: {
    store: Redux.createStore(...) // Create Flux/Redux/Relay store
  },
  container: document.getElementById('container')
});
```

##### Step 2 (for isomorphic apps)

```js
import express from 'express';
import App from 'react-app';
import Redux from 'redux';
import routes from './routes';
import Html from './components/Html';

const app = express();

app.use(App.create({
  routes,
  context: {
    store: Redux.createStore(...) // Create Flux/Redux/Relay store
  },
  template: Html
}));

app.listen(process.env.PORT || 3000);
```

**Note**: For Node.js v5 and below use `var App = require('react-app/legacy')`.

### Related Projects

* [React Starter Kit](https://github.com/kriasoft/react-starter-kit) — Isomorphic web app boilerplate (Node.js/Express, React.js, GraphQL)
* [Babel Starter Kit](https://github.com/kriasoft/babel-stater-kit) — JavaScript library boilerplate (ES2015, Babel, Rollup)
* [React Static Boilerplate](https://github.com/koistya/react-static-boilerplate) — Generate static websites from React components with Webpack
* [Universal Router](https://github.com/kriasoft/universal-router) — Isomorphic router for web and single-page applications (SPA)
* [Membership Database](https://github.com/membership/membership.db) — SQL database boilerplate for web app users, roles and auth tokens

### Get in Touch

* [#react-starter-kit](https://gitter.im/kriasoft/react-starter-kit) on Gitter
* [@koistya](https://twitter.com/koistya) on [Codementor](https://www.codementor.io/koistya)

### License

Copyright © 2016 Kriasoft, LLC. This source code is licensed under the MIT license found in the
[LICENSE.txt](https://github.com/kriasoft/react-app/blob/master/LICENSE.txt) file. The documentation
to the project is licensed under the [CC BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/)
license.

---
Made with ♥ by Konstantin Tarkus ([@koistya](https://twitter.com/koistya)) and [contributors](https://github.com/kriasoft/react-app/graphs/contributors)
