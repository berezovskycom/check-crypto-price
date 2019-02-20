import React from 'react';
import { Hashrouter as Router } from "react-router-dom";
import CryptoPage from './CryptoPage';

function handleHash() {
  const { hash } = window.location;
  return hash.slice(-3);
}

const Index = () => (
  <Router>
    <CryptoPage symbol={handleHash()} />
  </Router>
);

export default Index;
