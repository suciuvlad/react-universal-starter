import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppContainer from 'react-hot-loader/lib/AppContainer';
import Application from './application';

const data = JSON.parse(
  (document as any)
    .getElementById('__INITIAL__STATE')
    .textContent.replace(/%3C\/script%3E/g, '</script>')
);

const render = App => (
  ReactDOM.hydrate(
    <AppContainer>
      <BrowserRouter>
        <App initialProps={ data } />
      </BrowserRouter>
    </AppContainer>,
    document.getElementById('root')
  )
);

const anyModule = module as any;

if (process.env.NODE_ENV === 'development' && anyModule.hot)
  anyModule.hot.accept('./application.js', () => {
    const App = import('./application');
    render(App);
  });

render(Application);