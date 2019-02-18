import React from 'react';
import PropTypes from 'prop-types';

const CurrencyCreated = ({ at, ...etc }) => (
  <div className="CurrencyCreated" {...etc}>
    <h4 className="CurrencyCreated__At">{at}</h4>
  </div>
);

CurrencyCreated.propTypes = {
  at: PropTypes.string.isRequired,
};

export default CurrencyCreated;
