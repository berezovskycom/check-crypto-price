import React from 'react';
import PropTypes from 'prop-types';

const Symbol = ({ value, ...otherProps }) => (
  <span className="Symbol">({value})</span>
);

Symbol.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Symbol;
