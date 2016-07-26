# React Application Starter Kit

[![Join the chat at https://gitter.im/kriasoft/react-app](https://badges.gitter.im/kriasoft/react-app.svg)](https://gitter.im/kriasoft/react-app?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Boilerplate and tooling for JavaScript application development with [React](https://facebook.github.io/react/)

### TL;DR

```sh
$ npm install -g react-app
$ react-app new
$ react-app run
```

**See** [demo](https://rsb.kriasoft.com), [docs](https://github.com/kriasoft/react-static-boilerplate/tree/master/docs)
&nbsp;|&nbsp; **Follow us** on [Gitter](https://gitter.im/kriasoft/react-static-boilerplate) or [Twitter](https://twitter.com/ReactStatic)
&nbsp;|&nbsp; **Send feedback** to [@koistya](https://twitter.com/koistya)


### Features

&nbsp; &nbsp; ✓ Modern JavaScript syntax ([ES2015](http://babeljs.io/docs/learn-es2015/)+) via [Babel](http://babeljs.io/), modern CSS syntax via [PostCSS](https://github.com/postcss/postcss)<br>
&nbsp; &nbsp; ✓ Component-based UI architecture via [React](http://facebook.github.io/react/), [Webpack](https://webpack.github.io/) and [CSS Modules](https://github.com/css-modules/css-modules)<br>
&nbsp; &nbsp; ✓ Application state management /w time-travel debugging via [Redux](http://redux.js.org/) (see [`main.js`](template/main.js), [`core/store.js`](template/core/store.js))<br>
&nbsp; &nbsp; ✓ Routing and navigation via [`path-to-regexp`](https://github.com/pillarjs/path-to-regexp) and [`history`](https://github.com/mjackson/history) (see [`main.js`](template/main.js), [`core/router.js`](template/core/router.js), [`utils/routes-loader.js`](template/utils/routes-loader.js))<br>
&nbsp; &nbsp; ✓ [Code-splitting](https://github.com/webpack/docs/wiki/code-splitting) and async chunk loading via [Webpack](https://webpack.github.io/) and [ES6 System.import()](http://www.2ality.com/2014/09/es6-modules-final.html)<br>
&nbsp; &nbsp; ✓ Cross-device testing with [Browsersync](https://browsersync.io/) /w Hot Module Replacement ([HMR](https://webpack.github.io/docs/hot-module-replacement.html)) and [React Hot Loader](http://gaearon.github.io/react-hot-loader/)<br>
&nbsp; &nbsp; ✓ Zero-configuration, no build scripts, just one development dependency (`react-app-tools`)<br>
&nbsp; &nbsp; ✓ **24/7** community support on [Gitter](https://gitter.im/kriasoft/react-static-boilerplate); consulting and customization requests on [Codementor](https://www.codementor.io/koistya)<br>


### Requirements

* MAC OS X, Windows, or Linux
* [Node.js](https://nodejs.org) v6 or newer


### Getting Started

Install [`react-app`](https://www.npmjs.com/package/react-app) npm package globally. 

```sh
$ npm install -g react-app
```

Scaffold a new JavaScript application project and launch it by running:

```sh
$ react-app new
$ react-app run
```

The app should become available at [http://localhost:3000](http://localhost:3000)

For more information visit https://github.com/kriasoft/react-static-boilerplate


### How to Customize

Coming soon...


### Escape Hatch

If you’re a power user and you aren’t happy with the default configuration, you can always
[fork `react-app` repository](https://github.com/kriasoft/react-app/fork), customize it and use it
instead of of the original `react-app` and `react-app-tools` npm modules. For example
(`package.json`):

```js
{
  "private": true,
  "dependencies": {
    "react": "^15.2.1",
    "react-app": "git+https://github.com/<username>/react-app.git",
    "react-dom": "^15.2.1"
  },
  "devDependencies": {
    "react-app-tools": "git+https://github.com/<username>/react-app/tree/master/tools",
  },
  "scripts": {
    "build": "react-app build",
    "start": "react-app run",
  }
}
```


### License

Copyright © 2016-present Kriasoft, LLC. This source code is licensed under the MIT license found in
the [LICENSE.txt](https://github.com/kriasoft/react-app/blob/master/LICENSE.txt) file.


---
Made with ♥ by Konstantin Tarkus ([@koistya](https://twitter.com/koistya)) and [contributors](https://github.com/kriasoft/react-app/graphs/contributors)
