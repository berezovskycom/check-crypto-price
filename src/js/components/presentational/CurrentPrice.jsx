import React from 'react';
import PropTypes from 'prop-types';

const CurrentPrice = ({ value, currency }) => (
  <div className="CurrentPrice">
    <h1 className="CurrentPrice__Value">
      {value}
      <span className="CurrentPrice__Currency secondaryColor">{currency}</span>
    </h1>
  </div>
);

CurrentPrice.propTypes = {
  value: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
};

export default CurrentPrice;
