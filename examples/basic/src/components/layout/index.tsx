import * as React from 'react';
import { Link } from 'react-router-dom';

export default ({ children }) => (
  <div>
    <ul>
      <li> <Link to="/">Home</Link> </li>
      <li> <Link to="/contact">Contact</Link> </li>
      <li> <Link to="/this/will/not/match">Inexistent Path</Link> </li>
    </ul>

    { children }
  </div>
);