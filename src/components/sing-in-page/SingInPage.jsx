import React from 'react';
import { Link } from 'react-router-dom';

import classes from './SingInPage.module.scss';

const SingInPage = () => (
  <div className={classes.formContainer}>
    <p className={classes.header}>Sing In</p>
    <form className={classes.formBody}>
      <label className={classes.label} htmlFor="email">
        Email address
      </label>
      <input id="email" type="input" className={classes.input} placeholder="Email address" />
      <label className={classes.label} htmlFor="password">
        Password
      </label>
      <input id="password" type="password" className={classes.input} placeholder="Password" />
      <button type="submit" className={classes.btn}>
        Login
      </button>
    </form>
    <div className={classes.footer}>
      <span className={classes.text}>Don’t have an account?</span>
      <Link className={`${classes.text} ${classes.link}`} to="/sign-up">
        Sign Up.
      </Link>
    </div>
  </div>
);

export default SingInPage;
