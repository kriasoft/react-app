## React App Change Log

All notable changes to this project will be documented in this file.

### [Unreleased][unreleased]

- ...

### [v1.0.0-alpha.3] - 2016-05-13

- Support `props` returned from route actions. For example:<br>
  `{ path: '/', action: () => ({ title: 'Home', component: Home, props: { foo: 123 } }) }`
- Rename the named export `create` to `createApp`:<br>
  `import { createApp } from 'react-app';`

### [v1.0.0-alpha.2] - 2016-05-12

- The initial release

[unreleased]: https://github.com/kriasoft/react-app/compare/v1.0.0-alpha.3...HEAD
[v1.0.0-alpha.3]: https://github.com/kriasoft/react-app/compare/v1.0.0-alpha.2...v1.0.0-alpha.3
[v1.0.0-alpha.2]: https://github.com/kriasoft/react-app/commit/0afe0fe7741723ea07ee87ad4b22382c2204c575
