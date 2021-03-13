/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { getRegistration } from '../../service/UserService';
import { errorWithRegistration, successRegistration } from '../../reducers/userReducer/userActions';

import classes from './SingUpPage.module.scss';

const genStatusBlock = (status) => {
  const { email = null, username = null } = status;
  const emailError = email ? <p className={classes.errorMessage}>{`E-Mail ${email}!`}</p> : null;
  const usernameError = username ? <p className={classes.errorMessage}>{`User Name ${username}!`}</p> : null;

  let commonMessage;
  let styleBlock = classes.errorBlock;

  if (typeof status === 'string' && status === 'success') {
    styleBlock = classes.successBlock;
    commonMessage = (
      <>
        <p className={`${classes.successMessage} ${classes.successTitle}`}>Successfully registration!</p>
        <p className={classes.successMessage}>Redirect to sign-in page in 3 sec...</p>
      </>
    );
  } else if (typeof status === 'string') {
    commonMessage = <p className={classes.errorMessage}>{`Registration error: ${status}`}</p>;
  } else {
    commonMessage = null;
  }

  return (
    <div className={styleBlock}>
      {emailError}
      {usernameError}
      {commonMessage}
    </div>
  );
};

const SingUpPage = () => {
  const dispatch = useDispatch();
  const statusReg = useSelector((state) => state.user.statusReg);
  const onSuccessReg = useSelector((state) => state.user.onSuccessReg);
  const statusMessage = statusReg ? genStatusBlock(statusReg) : null;

  const errorInputClass = `${classes.input} ${classes.errorInput}`;
  const { register, errors, handleSubmit, getValues } = useForm();
  const onSubmit = (data) =>
    getRegistration(data)
      .then((res) => {
        if (res.errors) {
          dispatch(errorWithRegistration(res.errors));
        } else {
          dispatch(errorWithRegistration('success'));
          setTimeout(() => {
            dispatch(successRegistration(true));
            dispatch(successRegistration(false));
          }, 2500);
        }
      })
      .catch((error) => {
        dispatch(errorWithRegistration(error.message));
      });

  if (onSuccessReg) {
    return <Redirect to="/sign-in" />;
  }

  return (
    <div className={classes.formContainer}>
      <p className={classes.header}>Create new account</p>
      {statusMessage}
      <form className={classes.formBody} onSubmit={handleSubmit(onSubmit)}>
        <label className={classes.label} htmlFor="username">
          Username
        </label>
        <input
          id="username"
          type="input"
          className={errors.username?.type ? errorInputClass : classes.input}
          placeholder="Username"
          ref={register({ required: true, minLength: 3, maxLength: 20 })}
          name="username"
        />
        {errors.username?.type === 'required' && <span className={classes.errorMessage}>This is a required field</span>}
        {errors.username?.type === 'maxLength' && (
          <span className={classes.errorMessage}>Your password needs to be no more 20 characters.</span>
        )}
        {errors.username?.type === 'minLength' && (
          <span className={classes.errorMessage}>Your username needs to be at least 3 characters.</span>
        )}
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
          ref={register({ required: true, minLength: 8, maxLength: 40 })}
          name="password"
        />
        {errors.password?.type === 'required' && <span className={classes.errorMessage}>This is a required field</span>}
        {errors.password?.type === 'maxLength' && (
          <span className={classes.errorMessage}>Your password needs to be no more 40 characters.</span>
        )}
        {errors.password?.type === 'minLength' && (
          <span className={classes.errorMessage}>Your username needs to be at least 8 characters.</span>
        )}
        <label className={classes.label} htmlFor="repeat">
          Repeat Password
        </label>
        <input
          id="repeat"
          type="password"
          className={errors.repeat?.type ? errorInputClass : classes.input}
          placeholder="Password"
          ref={register({
            validate: (value) => value === getValues('password'),
            required: true,
          })}
          name="repeat"
        />
        {errors.repeat?.type === 'required' && <span className={classes.errorMessage}>This is a required field</span>}
        {errors.repeat?.type === 'validate' && <span className={classes.errorMessage}>Passwords must match</span>}
        <hr className={classes.line} />
        <div className={classes.checkboxContainer}>
          <input
            id="agree"
            type="checkbox"
            className={classes.checkbox}
            ref={register({ required: true })}
            name="agree"
            defaultChecked
          />
          <label
            className={errors.agree?.type === 'required' ? `${classes.label} ${classes.errorLabel}` : classes.label}
            htmlFor="agree"
          >
            I agree to the processing of my personal information
          </label>
        </div>
        <button type="submit" className={classes.btn}>
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
};

export default SingUpPage;
