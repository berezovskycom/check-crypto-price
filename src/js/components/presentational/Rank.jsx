import React from 'react';
import PropTypes from 'prop-types';

const Rank = ({ value }) => (
  <div className="Rank">
    <h3 className="Rank__Info">
      <span className="secondaryColor">#</span>
      {value}
    </h3>
  </div>
);

Rank.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Rank;
