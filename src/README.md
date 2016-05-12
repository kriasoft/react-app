## React App Source Code

### Usage Sample

```js
import App from 'react-app';
import routes from './routes';

// Render React app
App.create({ routes, context: { ... }});
````

Where `App.create()` works [isomorphically](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/)
depending on the environment this code is executed in (Node.js, Browser).

### `main.js`

Entry point for the Node.js environment

```js
import create from './create.node';
import Link from './Link';

export { create, Link }
export default { create, Link };
```

### `browser.js`

Entry point for the browser environment

```js
import create from './create.browser';
import Link from './Link';

export { create, Link }
export default { create, Link };
```

### `create.browser.js`

Browser version of `App.create()`. Renders React app into the DOM.

### `create.node.js`

Node.js version of `App.create()`. Creates Node.js/Express middleware that renders React app into
an HTML string.

### `withContext.js`

A higher-order React component (HOC) that helps to set [context variables](https://facebook.github.io/react/docs/context.html)
on the top-level React component.

### `Link.js`

A React component that helps to implement client-side navigation, e.g. `<Link to="/about">About</Link>`.

### `DefaultTemplate.js`

A React-based HTML template to be used during server-side rendering, if one wasn't provided via
options.
