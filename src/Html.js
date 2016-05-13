/**
 * React App (https://github.com/kriasoft/react-app)
 *
 * Copyright © 2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';

function Html({ lang, title, description, bundle, content }) {
  return (
    <html className="no-js" lang={lang}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
      </head>
      <body>
        <div id="container" dangerouslySetInnerHTML={{ __html: content }} />
        <script src={bundle} />
      </body>
    </html>
  );
}

Html.propTypes = {
  lang: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  bundle: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Html;
