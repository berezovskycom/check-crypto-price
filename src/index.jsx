import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './sass/style.sass';

import CryptoPage from './js/components/container/CryptoPage';
import Menu from './js/components/container/Menu';

function handleHash() {
  const { pathname } = window.location;
  return pathname;
}

const Index = () => (
  <Router>
    <div className="Page">
      {
        handleHash() !== `/menu` && <Route path={handleHash()} component={() => <CryptoPage symbol={handleHash().slice(1)} />} />
      }
      <Route exact path="/menu" component={Menu} />
    </div>
  </Router>
);
ReactDOM.render(
  <Index />,
  document.querySelector(`.app`),
);
