/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAuth } from '../../service/UserService';
import { errorWithAuth, successAuth } from '../../reducers/userReducer/userActions';

import classes from './SingInPage.module.scss';

const genStatusBlock = (status) => {
  const message = status.errors ? 'Your email or password is not correct!' : `Something was wrong: ${status}`;

  return (
    <div className={classes.errorBlock}>
      <p className={classes.errorMessage}>{message}</p>
    </div>
  );
};

const SingInPage = () => {
  const dispatch = useDispatch();
  const statusAuth = useSelector((state) => state.user.statusAuth);
  const statusMessage = statusAuth ? genStatusBlock(statusAuth) : null;

  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data) =>
    getAuth(data)
      .then((res) => {
        if (res.errors) {
          dispatch(errorWithAuth(res));
        } else {
          dispatch(errorWithAuth(false));
          dispatch(successAuth(res.user));
          localStorage.setItem('user', JSON.stringify(res.user));
        }
      })
      .catch((error) => {
        dispatch(errorWithAuth(error.message));
      });
  const errorInputClass = `${classes.input} ${classes.errorInput}`;

  return (
    <div className={classes.formContainer}>
      <p className={classes.header}>Sing In</p>
      {statusMessage}
      <form className={classes.formBody} onSubmit={handleSubmit(onSubmit)}>
        <label className={classes.label} htmlFor="email">
          Email address
        </label>
        <input
          id="email"
          type="input"
          className={errors.email?.type ? errorInputClass : classes.input}
          placeholder="Email address"
          ref={register({
            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            required: true,
          })}
          name="email"
        />
        {errors.email?.type === 'required' && <span className={classes.errorMessage}>This is a required field</span>}
        {errors.email?.type === 'pattern' && (
          <span className={classes.errorMessage}>You need specify a valid email address</span>
        )}
        <label className={classes.label} htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          className={errors.password?.type ? errorInputClass : classes.input}
          placeholder="Password"
          ref={register({ required: true })}
          name="password"
        />
        {errors.password?.type === 'required' && <span className={classes.errorMessage}>This is a required field</span>}
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
};

export default SingInPage;
