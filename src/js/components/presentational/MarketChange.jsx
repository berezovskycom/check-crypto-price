import React from 'react';
import PropTypes from 'prop-types';

const MarketChange = ({ percent }) => (
  <div className="MarketChange">
    <div className="MarketChange__Percent">{percent}<span className="secondaryColor">%</span></div>
  </div>
);

MarketChange.propTypes = {
  percent: PropTypes.number.isRequired,
};

export default MarketChange;
