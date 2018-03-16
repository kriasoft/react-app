const path = require('path');
const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const App = require('./components/App');
const assets = require('./assets.json');

const app = express();

app.get('*', (req, res) => {
  res.send(`
    <html>
      <body>
        <div id="root">${ReactDOMServer.renderToString(<App />)}</div>
        ${assets.map(src => `<script src="${src}"></script>`)}
      </body>
    </html>
  `);
});

if (process.env.NODE_ENV === 'production') {
  app.listen(process.env.PORT || 8080);
} else {
  module.exports.default = app;
}
