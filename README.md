# React App SDK &nbsp; <a href="https://github.com/kriasoft/react-app/stargazers"><img src="https://img.shields.io/github/stars/kriasoft/react-app.svg?style=social&label=Star&maxAge=3600" height="20"></a> <a href="https://twitter.com/ReactSDK"><img src="https://img.shields.io/twitter/follow/ReactSDK.svg?style=social&label=Follow&maxAge=3600" height="20"></a>

**CLI tools and templates** for authoring **[React](https://facebook.github.io/react/)** applications with a single dev dependency and zero build/run configuration. 


### TL;DR

```sh
$ npm install -g react-app
$ react-app new
$ react-app run
```

**See** [demo](https://rsb.kriasoft.com), [docs](https://github.com/kriasoft/react-static-boilerplate/tree/master/docs)
&nbsp;|&nbsp; **Join** [#react-app](https://gitter.im/kriasoft/react-app) chat on Gitter to stay up to date
&nbsp;|&nbsp; **Follow us** on [Twitter](https://twitter.com/ReactSDK)
&nbsp;|&nbsp; **Send feedback** to [@koistya](https://twitter.com/koistya)

<img src="https://koistya.github.io/files/react-app-starter-kit.png" width="100%">

### Features

&nbsp; &nbsp; ✓ Zero-configuration, no build scripts, just one development dependency (see [`package.json`](template/package.json))<br>
&nbsp; &nbsp; ✓ Modern JavaScript syntax ([ES2015](http://babeljs.io/docs/learn-es2015/)+) via [Babel](http://babeljs.io/) or [TypeScript](https://www.typescriptlang.org/) (planned), modern CSS syntax via [PostCSS](https://github.com/postcss/postcss)<br>
&nbsp; &nbsp; ✓ Component-based UI architecture via [React](http://facebook.github.io/react/), [Webpack](https://webpack.github.io/) and [CSS Modules](https://github.com/css-modules/css-modules)<br>
&nbsp; &nbsp; ✓ Application state management /w time-travel debugging via [Redux](http://redux.js.org/) (see [`main.js`](template/main.js), [`core/store.js`](template/core/store.js))<br>
&nbsp; &nbsp; ✓ Routing and navigation via [`path-to-regexp`](https://github.com/pillarjs/path-to-regexp) and [`history`](https://github.com/mjackson/history) (see [`main.js`](template/main.js), [`core/router.js`](template/core/router.js), [`utils/routes-loader.js`](template/utils/routes-loader.js))<br>
&nbsp; &nbsp; ✓ [Code-splitting](https://github.com/webpack/docs/wiki/code-splitting) and async chunk loading via [Webpack](https://webpack.github.io/) and [ES6 System.import()](http://www.2ality.com/2014/09/es6-modules-final.html)<br>
&nbsp; &nbsp; ✓ Cross-device testing with [Browsersync](https://browsersync.io/) /w Hot Module Replacement ([HMR](https://webpack.github.io/docs/hot-module-replacement.html)) and [React Hot Loader](http://gaearon.github.io/react-hot-loader/)<br>
&nbsp; &nbsp; ✓ **24/7** community support on [Gitter](https://gitter.im/kriasoft/react-app) and [SO](http://stackoverflow.com/questions/tagged/react-app); consulting and customization requests on [Codementor](https://www.codementor.io/koistya) or [Skype](http://hatscripts.com/addskype?koistya)<br>


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

For more information visit [`/templates/app`](https://github.com/kriasoft/react-app/tree/master/templates/app)


### How to Customize

Coming soon...


### Escape Hatch

If you’re a power user and you aren’t happy with the default configuration, you can always
[fork `react-app` repository](https://github.com/kriasoft/react-app/fork), customize it and use it
instead of of the original `react-app-tools` npm module. For example (`package.json`):

```js
{
  "private": true,
  "dependencies": {
    "react": "^15.2.1",
    "react-app": "^1.1.1",
    "react-dom": "^15.2.1"
  },
  "devDependencies": {
    "react-app-tools": "git+https://github.com/<username>/react-app.git",
  },
  "scripts": {
    "build": "react-app build",
    "start": "react-app run",
  }
}
```


### Contribute

Help shape the future of **React App SDK** by joining our [community](https://gitter.im/kriasoft/react-app)
today, check out the [open issues](https://github.com/kriasoft/react-app/issues), submit [new
feature ideas](https://github.com/kriasoft/react-app/issues/new?labels=enhancement) and [bug
reports](https://github.com/kriasoft/react-app/issues/new?labels=bug), send us [pull
requests](CONTRIBUTING.md#pull-requests)!


### Support

* [#react-app](http://stackoverflow.com/questions/tagged/react-app) on Stack Overflow
* [#react-app](https://gitter.im/kriasoft/react-app) chat room on Gitter


### License

Copyright © 2016-present Kriasoft, LLC. This source code is licensed under the MIT license found in
the [LICENSE.txt](https://github.com/kriasoft/react-app/blob/master/LICENSE.txt) file.


---
Made with ♥ by Konstantin Tarkus ([@koistya](https://twitter.com/koistya)) and [contributors](https://github.com/kriasoft/react-app/graphs/contributors)
