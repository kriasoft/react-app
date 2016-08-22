# React App Starter Kit

This project was created with **[React App SDK](https://github.com/kriasoft/react-app)** — CLI
tools and templates for authoring React/Redux applications with just a single dev dependency and
zero configuration.


### Directory Layout

```shell
.
├── /actions/                   # Redux actions
├── /components/                # Shared or generic UI components
│   ├── /Button/                # Button component
│   ├── /Layout/                # Website layout component
│   ├── /Link  /                # Link component to be used insted of <a>
│   └── /...                    # etc.
├── /core/                      # Core framework
│   ├── /history.js             # Handles client-side navigation
│   ├── /router.js              # Handles routing and data fetching
│   └── /store.js               # Application state manager (Redux)
├── /node_modules/              # 3rd-party libraries and utilities
├── /routes/                    # React components for application routes
│   ├── /Error/                 # Error page
│   ├── /Home/                  # Home page
│   ├── /GetStarted/            # Getting Started page
│   └── /...                    # etc.
├── /public/                    # Static files such as favicon.ico etc.
│   ├── /dist/                  # The folder for compiled output
│   ├── favicon.ico             # Application icon to be displayed in bookmarks
│   ├── robots.txt              # Instructions for search engine crawlers
│   └── /...                    # etc.
├── /test/                      # Unit and integration tests
├── /utils/                     # Utility and helper classes
│── index.ejs                   # EJS template for index.html page
│── main.js                     # React application entry point
│── package.json                # The list of project dependencies and NPM scripts
└── routes.json                 # This list of application routes
```


### How to Run

In order to compile the app and launch a development web server with "live reload" run:

```sh
$ npm start
```

The app should become available at [http://localhost:3000](http://localhost:3000)

### Common Tasks

- In order to modify the layout of your site, edit `components/Layout` React component
- To add custom fonts, page metadata edit `index.ejs` file in the root of your project
- To add a new page/screen add a new entry to the `routes.json` file with routing information, plus
  add a React component inside the `routes` folder that will be responsible for rendering that route
- Need to create small, reusable component (e.g. Button, Slider)? Put that it into the `components`
  folder.
- Style your components with either CSS or inline styles. This project is pre-configured with CSS
  Modules as well as PostCSS with a nice set of useful plugins (no need to use Sass or LESS).
- Use `core/history.js` file for navigation, learn more about it [here](https://github.com/ReactTraining/history/tree/master/docs)
- Learn how to effectively use [Browsersync](https://browsersync.io/), it will help with
  cross-device testing.


### Support

Have any questions, issues or feature requests, please don't hesitate to get in touch on
[Gitter](https://gitter.im/kriasoft/react-app) or [Twitter](https://twitter.com/ReactSDK).
