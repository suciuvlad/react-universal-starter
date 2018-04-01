import * as React from 'react';

class Document extends React.Component<any, any> {
  static getInitialProps ({ Js, initialProps, renderPage }) {
    const page = renderPage();
    return { Js, initialProps, ...page };
  }

  render () {
    const { helmet, Js, initialProps } = this.props;

    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
          <link rel="preconnect" href="//static.cdn.com" />
          <link rel="preconnect" href="//images.cdn.com" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="application-name" content="PWA" />
          <meta name="apple-mobile-web-app-title" content="PWA" />
          <meta name="theme-color" content="#5500eb" />
          <meta name="msapplication-navbutton-color" content="#5500eb" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="msapplication-starturl" content="/" />
          { helmet.title.toComponent() }
          { helmet.meta.toComponent() }
          { helmet.link.toComponent() }
          { helmet.script.toComponent() }
        </head>
        <body>
          <div id="root">REACT_UNIVERSAL_STARTER_TEMPLATE</div>

          <script
            id="__INITIAL__STATE"
            type="application/json"
            dangerouslySetInnerHTML={ {
              __html: JSON.stringify({ ...initialProps }).replace(
                /<\/script>/g,
                '%3C/script%3E'
              )
            } }
          />


        </body>
      </html>
    )
  }
}

export default Document;