import React from 'react';
import { Hashrouter as Router } from "react-router-dom";
import CryptoPage from './CryptoPage';

// const Index = () => (
//   <div className="Index">
//     <CryptoPage />
//   </div>
// );

function handleHash() {
  const { hash } = window.location;
  return hash.slice(-3);
}

console.log(handleHash);

const Index = () => (
  <Router>
    <CryptoPage symbol={handleHash()} />
  </Router>
);

export default Index;
