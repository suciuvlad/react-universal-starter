import * as React from 'react';
import ReactDOM from 'react-dom/server';
import Helmet from 'react-helmet';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import { loadGetInitialProps } from './load-initial-props';
import Application from './application';
import { StaticRouter } from 'react-router-dom';
import Document from './_document';
import * as url from 'url';

import paths from '../webpack/paths';

// const clientStats = require(paths.clientStatsPath)

const renderFn = (Page: React.ComponentType<any>) => (props: any) => (
  <Page {...props} />
);

export default async ({ req, res, routes }) => {
  const context = {};

  const pathname = url.parse(req.url).pathname as any;
  const { match, initialProps } = await loadGetInitialProps(pathname, routes);

  console.log(1);

  const renderPage = (fn = renderFn) => {
    const html = ReactDOM.renderToString(
      <StaticRouter location={ req.url } context={ context }>
        { fn(Application)({ routes, initialProps }) }
      </StaticRouter>
    );

    return {
      html,
      helmet: Helmet.renderStatic()
    }
  }
  const clientStats = {};
  console.log(2);


  // const chunkNames = flushChunkNames();
  // const { Js } = flushChunks(clientStats, { chunkNames });
  const Js = {};

  console.log(3);
  console.log(Js);
  console.log(4);

  // if (match && match.path === '**') {
  //   res.status(400).end();
  // } else if (match && match.redirectTo) {
  //   res.redirect(301, req.originalUrl.replace(match.path, match.redirectTo));
  //   return;
  // }

  const { html, ...documentProps } = await Document.getInitialProps({
    Js,
    initialProps,
    renderPage
  });

  const document = ReactDOM.renderToStaticMarkup(
    <Document { ...documentProps } />
  );
  
  console.log(5);

  res.send(`
    <!doctype html>
    ${ document.replace('REACT_UNIVERSAL_STARTER_TEMPLATE', html) }
  `);

}