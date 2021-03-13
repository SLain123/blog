/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Header.module.scss';

function Header() {
  return (
    <header className={classes.header}>
      <Link to="/articles" className={classes.logo}>
        Realworld Blog
      </Link>
      <nav>
        <Link to="/sign-in" className={classes.authBtn}>
          Sign In
        </Link>
        <Link to="/sign-up" className={`${classes.authBtn} ${classes.authBtn_active}`}>
          Sign Up
        </Link>
      </nav>
    </header>
  );
}

export default Header;
