import React from 'react';
import { Link } from 'react-router-dom';
// import { makeRegistration } from '../../service/userService';

import classes from './SingUpPage.module.scss';

const SingUpPage = () => (
  <div className={classes.formContainer}>
    <p className={classes.header}>Create new account</p>
    <form className={classes.formBody}>
      <label className={classes.label} htmlFor="username">
        Username
      </label>
      <input id="username" type="input" className={classes.input} placeholder="Username" />
      <label className={classes.label} htmlFor="email">
        Email address
      </label>
      <input id="email" type="input" className={classes.input} placeholder="Email address" />
      <label className={classes.label} htmlFor="password">
        Password
      </label>
      <input id="password" type="password" className={classes.input} placeholder="Password" />
      <label className={classes.label} htmlFor="repeat">
        Repeat Password
      </label>
      <input id="repeat" type="password" className={classes.input} placeholder="Password" />
      <hr className={classes.line} />
      <div className={classes.checkboxContainer}>
        <input id="agree" type="checkbox" className={classes.checkbox} />
        <label className={classes.label} htmlFor="agree">
          I agree to the processing of my personal information
        </label>
      </div>
      <button
        type="submit"
        className={classes.btn}
        onClick={(evt) => {
          evt.preventDefault();
          console.log(evt);
        }}
      >
        Create
      </button>
    </form>
    <div className={classes.footer}>
      <span className={classes.text}>Already have an account?</span>
      <Link className={`${classes.text} ${classes.link}`} to="/sign-in">
        Sign In.
      </Link>
    </div>
  </div>
);

export default SingUpPage;
