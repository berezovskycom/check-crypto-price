import React from 'react';
import PropTypes from 'prop-types';

const MarketChange = ({ percent }) => (
  <div className="MarketChange">
    <div className={`
      MarketChange__Percent 
      MarketChange__Percent${percent >= 0 ? `--up` : `--down`}
    `}
    >
      {percent}
      <span className="secondaryColor">%</span>
    </div>
  </div>
);

MarketChange.propTypes = {
  percent: PropTypes.string.isRequired,
};

export default MarketChange;
