/**
 * React App SDK (https://github.com/kriasoft/react-app)
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { Link } from 'react-router';
import s from './Navigation.css';

function Navigation() {
  return (
    <nav className={s.nav}>
      <Link className={s.link} activeClassName={s.active} to="/">
        About
      </Link>
      <Link className={s.link} activeClassName={s.active} to="/get-started">
        Get Started
      </Link>
      <Link className={s.link} activeClassName={s.active} to="/404">
        Not Found
      </Link>
    </nav>
  );
}

export default Navigation;
