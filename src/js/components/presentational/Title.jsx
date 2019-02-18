import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ name, symbol, ...otherProps }) => (
  <div className="Title" {...otherProps}>
    <h3 className="Title__Name">{name}</h3>
    <span className="Title__Symbol">{symbol}</span>
  </div>
);

Title.propTypes = {
  name: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
};

export default Title;
