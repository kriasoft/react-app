# React App SDK &nbsp; <a href="https://github.com/kriasoft/react-app/stargazers"><img src="https://img.shields.io/github/stars/kriasoft/react-app.svg?style=social&label=Star&maxAge=3600" height="20"></a> <a href="https://twitter.com/ReactSDK"><img src="https://img.shields.io/twitter/follow/ReactSDK.svg?style=social&label=Follow&maxAge=3600" height="20"></a> <a href="https://t.me/reactapp"><img src="https://img.shields.io/badge/chat-Telegram-green.svg?style=social&maxAge=3600" height="20"></a>

**React App SDK** is an extension to **[Create React App](https://github.com/facebook/create-react-app)**
that allows building React applications alonside the Node.js backend, be that server-side rendering
(SSR), REST or GraphQL APIs, cloud functions, you name it.

It's intended to be used as a drop-off replacement for `react-scripts` NPM module. If you want to
add server-side code into your application built with Create React App, all you have to do is to
replace `react-scripts` dev dependency in your project with `react-app-tools` plus provide one more
entry point for the server-side application bundle as demonstrated below:

#### Directory Layout

```bash
.
├── /build/                     # Compiled output
│   ├── /public/                # Pre-compiled client-side app
│   └── server.js               # Pre-compiled Node.js app
├── /src/                       # Application source files
│   ├── /components/            # React.js components
│   │   ├── /App/               #   - The top-level React component
│   │   ├── /Button/            #   - Some other UI element
│   │   └── ...                 #   - etc.
│   ├── app.browser.js          # Client-side rendering, e.g. ReactDOM.render(<App />, container)
│   ├── app.node.js             # Server-side rendering, e.g. ReactDOMServer.renderToString(<App />)
│   └── server.js               # Server-side entiry point, e.g. app.listen(process.env.PORT)
└── package.json                # List of project dependencies and NPM scripts
```

#### `package.json`

```diff
{
  "dependencies": {
+   "express": "^4.6.12",
    "react": "^16.2.0",
    "react-dom": "^16.2.0"
  },
  {
-   "react-scripts": "^1.1.1"
+   "react-app-tools": "^2.0.0-beta.2"
  },
  "scripts": {
-   "test": "react-scripts test --env=jsdom",
+   "test": "react-app test --env=jsdom",
-   "build": "react-scripts build",
+   "build": "react-app build",
-   "start": "react-scripts start"
+   "start": "react-app start"
  }
}
```

#### `src/app.browser.js` - Client-side rendering

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(<App />, document.getElementById('root'));
```

#### `src/app.node.js` - Server-side rendering and REST or GraphQL API

```js
import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './components/App';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use('*', (req, res) => {
  res.send(ReactDOMServer.renderToString(<App />));
});

export default app;
```

#### `src/server.js` - Server-side entry point

```js
import app from './app.node';

app.listen(process.env.PORT || 8080);
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

* [Getting Started](https://github.com/facebookincubator/create-react-app#getting-started) – How to create a new app.
* [User Guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) – How to develop apps bootstrapped with Create React App.

Join our Telegram chat for support and feature requests - https://t.me/reactapp

<p align="center"><a href="https://www.youtube.com/watch?v=GH3kJwQ7mxM"><img src="http://img.youtube.com/vi/GH3kJwQ7mxM/maxresdefault.jpg" width="1187" alt="Server-side rendering with React.js" /><br /><sup>How fast is React SSR?</sup></a></p>

### Contribute

Help shape the future of **React App SDK** by joining our [community](https://t.me/reactapp)
today, check out the [open issues](https://github.com/kriasoft/react-app/issues), submit [new
feature ideas](https://github.com/kriasoft/react-app/issues/new?labels=enhancement) and [bug
reports](https://github.com/kriasoft/react-app/issues/new?labels=bug), send us [pull
requests](CONTRIBUTING.md#submitting-a-pull-request)!

### License

[MIT](https://github.com/kriasoft/react-app/blob/master/LICENSE.txt) © 2016-present Facebook, Kriasoft
