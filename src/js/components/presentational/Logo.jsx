import React from 'react';
import PropTypes from 'prop-types';

const Logo = ({
  name,
  src,
  rank,
  ...otherProps
}) => (
  <div className="Logo" {...otherProps}>
    <div
      className="Logo__Image Logo__Image--circled"
      style={{ backgroundImage: `url(${src})` }}
    >
      {name}
    </div>
  </div>
);

Logo.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export default Logo;
