import React from 'react';
import PropTypes from 'prop-types';

const Nav = ({ items }) => {
  const navList = [
    {
      title: `Bitcoin`,
      href: `/btc`,
    },
    {
      title: `Ethereum`,
      href: `/eth`,
    },
  ];

  return (
    <nav className="Nav">
      {
        navList.map((item, i) => (
          <a
            className="Nav__Item"
            href={item.href}
            key={i++}
          >
            {item.title}
          </a>
        ))
      }
    </nav>
  )
};

Nav.propTypes = {
  items: PropTypes.array,
};

export default Nav;
