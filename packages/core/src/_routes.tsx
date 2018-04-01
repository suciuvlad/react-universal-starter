import universal from 'react-universal-component';

import Home from 'pages/home';
// const Home = universal(import('pages/home'));
const Contact = universal(import('pages/contact'));

export default [
  {
    path: '/',
    exact: true,
    component: Home
  },

  {
    path: '/contact',
    component: Contact
  }
];