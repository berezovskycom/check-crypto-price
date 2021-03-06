/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';

const MarketPrice = ({
  low,
  high,
  currency,
  ...etc
}) => (
  <div className="MarketPrice" {...etc}>
    <div className="MarketPrice__High">
      {high}
      <span className="secondaryColor">{currency} HI</span>
    </div>
    <div className="MarketPrice__Low">
      LO {low}
      <span className="secondaryColor">{currency}</span>
    </div>
  </div>
);

MarketPrice.propTypes = {
  low: PropTypes.string.isRequired,
  high: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
};

export default MarketPrice;
