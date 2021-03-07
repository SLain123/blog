import React from 'react';
import { useSelector } from 'react-redux';

import classes from './ErrorMessage.module.scss';

const ErrorMessage = () => {
  const onFail = useSelector((state) => state.list.onFail);

  return (
    <div className={classes.error}>
      <p className={classes.text}>{`Download failed: ${onFail.message}.`}</p>
      <p className={classes.text}>Please, refresh the page.</p>
    </div>
  );
};

export default ErrorMessage;
