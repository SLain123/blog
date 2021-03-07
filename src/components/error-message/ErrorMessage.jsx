import React from 'react';
import PropTypes from 'prop-types';

import classes from './ErrorMessage.module.scss';

const ErrorMessage = ({ errorMessage }) => (
  <div className={classes.error}>
    <p className={classes.text}>{`Download failed: ${errorMessage}.`}</p>
    <p className={classes.text}>Please, refresh the page.</p>
  </div>
);

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default ErrorMessage;
