import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ name, ...otherProps }) => (
  <div className="Title" {...otherProps}>
    <h1 className="Title__Name">{name}</h1>
  </div>
);

Title.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Title;
