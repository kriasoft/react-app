/**
 * React App SDK (https://github.com/kriasoft/react-app)
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Header from './Header';
import s from './Layout.css';

function Layout(props) {
  return (
    <div className={s.root}>
      <Header />
      <main className={s.content}>
        <div {...props} className={`${s.content}${props.className ? ` ${props.className}` : ''}`} />
      </main>
    </div>
  );
}

Layout.propTypes = { className: PropTypes.string };

export default Layout;
