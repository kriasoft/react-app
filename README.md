<h1 align="center">
  React App SDK<br>
  <a href="https://npmjs.com/package/react-app-tools"><img src="https://img.shields.io/npm/v/react-app-tools.svg?maxAge=3600" height="20"></a>
  <a href="https://npmjs.com/package/react-app-tools"><img src="https://img.shields.io/npm/dm/react-app-tools.svg?maxAge=3600" height="20"></a>
  <a href="https://opencollective.com/react-app"><img src="https://opencollective.com/react-app/backers/badge.svg?maxAge=3600" height="20"></a>
  <a href="https://twitter.com/ReactSDK"><img src="https://img.shields.io/twitter/follow/ReactSDK.svg?style=social&amp;label=Follow&amp;maxAge=3600" height="20"></a>
  <a href="https://t.me/reactapp"><img src="https://img.shields.io/badge/chat-Telegram-green.svg?style=social&amp;maxAge=3600" height="20"></a>
</h1>

Everything you love about **[Create React App](https://github.com/facebook/create-react-app)** plus
server-side code support (SSR, GraphQL API, etc) and config overrides (Babel, Webpack, etc.). See
the [demo project](https://github.com/kriasoft/react-firebase-starter).

**React App SDK** is intended to be used as a drop-in replacement for `react-scripts` NPM module.
If you want to add server-side code into your application built with Create React App, all you have
to do is to replace `react-scripts` dev dependency with `react-app-tools` plus provide one more
entry point for Node.js as demonstrated below:

#### Directory Layout

```bash
.
├── build/                      # Compiled output
├── src/                        # Universal application source code
│   ├── components/             # Shared React.js components
│   │   ├── /App/               #   - The top-level React component
│   │   ├── /Button/            #   - Some other UI element
│   │   └── ...                 #   - etc.
│   ├── server/                 # Node.js app
│   │   ├── ssr.js              #   - Server-side rendering, e.g. ReactDOMServer.renderToString(<App />)
│   │   ├── api.js              #   - GraphQL API endpoint
│   │   └── index.js            #   - Node.js app entry point
│   └── index.js                # Client-side app entry point, e.g. ReactDOM.hydrate(<App />, container)
└── package.json                # List of project dependencies and NPM scripts
```

#### `package.json`

```diff
{
  "main": "build/server.js",
  "engines": {
    "node": ">=8.10"
  },
  "dependencies": {
+   "express": "^4.6.14",
    "react": "^16.8.4",
    "react-dom": "^16.8.4"
  },
  {
-   "react-scripts": "^1.1.1"
+   "react-app-tools": "^3.1.0-preview.7"
  },
  "scripts": {
-   "start": "react-scripts start",
+   "start": "react-app start",
-   "build": "react-scripts build",
+   "build": "react-app build",
-   "test": "react-scripts test"
+   "test": "react-app test"
  }
}
```

#### `src/index.js` - Client-side rendering

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.hydrate(<App />, document.getElementById('root'));
```

#### `src/server/index.js` - Server-side rendering and/or API endpoint

```js
const path = require('path');
const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const App = require('../components/App');
const stats = require('./stats.json');

const app = express();

app.get('*', (req, res) => {
  res.send(`
    <html>
      <body>
        <div id="root">${ReactDOMServer.renderToString(<App />)}</div>
        ${stats.entrypoints.main.assets.map(
          src => `<script src="${src}"></script>`
        )}
      </body>
    </html>
  `);
});

if (process.env.NODE_ENV === 'production') {
  app.listen(process.env.PORT || 8080);
} else {
  module.exports.default = app;
}
```

You can launch the app in development mode by running:

```sh
$ npm install
$ npm start
```

Then open [http://localhost:3000/](http://localhost:3000/) to see your app.<br>
When you’re ready to deploy to production, create a minified bundle with `npm run build`.

<p align="center"><img src='https://camo.githubusercontent.com/506a5a0a33aebed2bf0d24d3999af7f582b31808/687474703a2f2f692e696d6775722e636f6d2f616d794e66434e2e706e67' width='600' alt='npm start'></p>

For more information refer to Create React App documentation:

- [Getting Started](https://github.com/facebookincubator/create-react-app#getting-started) – How to create a new app.
- [User Guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) – How to develop apps bootstrapped with Create React App.

Join our Telegram chat for support and feature requests - https://t.me/reactapp

<p align="center"><a href="https://www.youtube.com/watch?v=GH3kJwQ7mxM"><img src="http://img.youtube.com/vi/GH3kJwQ7mxM/maxresdefault.jpg" width="1187" alt="Server-side rendering with React.js" /><br /><sup>How fast is React SSR?</sup></a></p>

## How to Customize

Create `webpack.config.js` file in the root of your project that extends the
default Webpack configuration. For example:

```js
module.exports = () => {
  const [
    browserConfig,
    serverConfig,
  ] = require('react-app-tools/config/webpack');
  return [
    browserConfig,
    {
      ...serverConfig,
      plugins: {
        ...serverConfig.plugins.concat(
          new LimitChunkCountPlugin({ maxChunks: 1 })
        ),
      },
    },
  ];
};
```

## Backers

Love **React App SDK**? Help us keep it alive by [donating](https://opencollective.com/react-app)
funds to cover project expenses!

<a href="https://opencollective.com/react-app/backers/0/website">
  <img src="https://opencollective.com/react-app/backers/0/avatar">
</a>
<a href="https://opencollective.com/react-app/backers/1/website">
  <img src="https://opencollective.com/react-app/backers/1/avatar" height="64">
</a>
<a href="https://opencollective.com/react-app/backers/2/website">
  <img src="https://opencollective.com/react-app/backers/2/avatar" height="64">
</a>
<a href="https://opencollective.com/react-app/backers/3/website">
  <img src="https://opencollective.com/react-app/backers/3/avatar" height="64">
</a>
<a href="https://opencollective.com/react-app/backers/4/website">
  <img src="https://opencollective.com/react-app/backers/4/avatar" height="64">
</a>
<a href="https://opencollective.com/react-app/backers/5/website">
  <img src="https://opencollective.com/react-app/backers/5/avatar" height="64">
</a>
<a href="https://opencollective.com/react-app/backers/6/website">
  <img src="https://opencollective.com/react-app/backers/6/avatar" height="64">
</a>
<a href="https://opencollective.com/react-app/backers/7/website">
  <img src="https://opencollective.com/react-app/backers/7/avatar" height="64">
</a>
<a href="https://opencollective.com/react-app/backers/8/website">
  <img src="https://opencollective.com/react-app/backers/8/avatar" height="64">
</a>
<a href="https://opencollective.com/react-app/backers/9/website">
  <img src="https://opencollective.com/react-app/backers/9/avatar" height="64">
</a>
<a href="https://opencollective.com/react-app/backers/10/website">
  <img src="https://opencollective.com/react-app/backers/10/avatar" height="64">
</a>
<a href="https://opencollective.com/react-app/backers/11/website">
  <img src="https://opencollective.com/react-app/backers/11/avatar" height="64">
</a>

## Contribute

Help shape the future of **React App SDK** by joining our [community](https://t.me/reactapp)
today, check out the [open issues](https://github.com/kriasoft/react-app/issues), submit [new
feature ideas](https://github.com/kriasoft/react-app/issues/new?labels=enhancement) and [bug
reports](https://github.com/kriasoft/react-app/issues/new?labels=bug), send us [pull
requests](CONTRIBUTING.md#submitting-a-pull-request)!

## License

[MIT](https://github.com/kriasoft/react-app/blob/master/LICENSE) © 2016-present Facebook, Kriasoft.
