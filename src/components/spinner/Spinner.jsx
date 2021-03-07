import React from 'react';

import classes from './Spinner.module.scss';

const Spinner = () => (
  <div className={classes.allthethings}>
    <div className={`${classes.circle} ${classes.circles}`} />
    <div className={`${classes.circle} ${classes.circle0}`} />
    <div className={`${classes.circle} ${classes.circle1}`} />
    <div className={`${classes.circle} ${classes.circle2}`} />
    <div className={`${classes.circle} ${classes.circle3}`} />
    <div className={`${classes.circle} ${classes.circle4}`} />
  </div>
);

export default Spinner;
