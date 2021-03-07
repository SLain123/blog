/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Header.module.scss';

function Header() {
  return (
    <header className={classes.header}>
      <Link to="/" className={classes.logo}>
        Realworld Blog
      </Link>
      <div>
        <Link to="/" className={classes.authBtn}>
          Sign In
        </Link>
        <Link to="/" className={`${classes.authBtn} ${classes.authBtn_active}`}>
          Sign Up
        </Link>
      </div>
    </header>
  );
}

export default Header;
