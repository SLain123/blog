/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/self-closing-comp */
import React from 'react';

import classes from './Header.module.scss';

function Header() {
  return (
    <header className={classes.header}>
      <a href="#" className={classes.logo}>
        Realworld Blog
      </a>
      <div>
        <a href="#" className={classes.authBtn}>
          Sign In
        </a>
        <a href="#" className={`${classes.authBtn} ${classes.authBtn_active}`}>
          Sign Up
        </a>
      </div>
    </header>
  );
}

export default Header;
