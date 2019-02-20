import React from 'react';
import PropTypes from 'prop-types';

const LastUpdated = ({ at, ...etc }) => (
  <div className="LastUpdated" {...etc}>
    <h4 className="LastUpdated__At">{at}</h4>
  </div>
);

LastUpdated.propTypes = {
  at: PropTypes.string.isRequired,
};

export default LastUpdated;
