/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Link } from 'react-router-dom';

const Favorites = () => (
  <div>
    <h1>List of favorite cryptocurrencies</h1>
    {
      window.localStorage.favCryptos
        ? JSON.parse(window.localStorage.favCryptos).map((coin) => {
          const { id, symbol, name } = coin;
          return (
            <a href={`/${symbol}`} key={id}>{name}</a>
          );
        }) : (
          <p>
            Looks like you do not have any. Browse in <Link to="/menu">Menu</Link>
          </p>
        )
    }
  </div>
);

export default Favorites;
