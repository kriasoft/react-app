/**
 * React App (https://github.com/kriasoft/react-app)
 *
 * Copyright © 2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';

function withContext(context, component) {
  class Context extends Component {
    getChildContext() {
      return context;
    }

    render() {
      return component;
    }
  }

  Context.childContextTypes = Object.keys(context).reduce((obj, key) => {
    const value = context[key];

    /* eslint-disable no-param-reassign */
    if (typeof value === 'string' || value instanceof String) {
      obj[key] = PropTypes.string;
    } else if (typeof value === 'function') {
      obj[key] = PropTypes.func;
    } else if (typeof value === 'number') {
      obj[key] = PropTypes.number;
    } else if (typeof value === 'boolean') {
      obj[key] = PropTypes.bool;
    } else {
      obj[key] = PropTypes.object;
    }
    /* eslint-enable no-param-reassign */

    return obj;
  }, {});

  return <Context />;
}

export default withContext;
