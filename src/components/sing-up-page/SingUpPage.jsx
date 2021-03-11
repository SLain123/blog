/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// import { makeRegistration } from '../../service/userService';

import classes from './SingUpPage.module.scss';

const SingUpPage = () => {
  const errorInputClass = `${classes.input} ${classes.errorInput}`;
  const { register, errors, handleSubmit, getValues } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className={classes.formContainer}>
      <p className={classes.header}>Create new account</p>
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
          className={errors.username?.type ? errorInputClass : classes.input}
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
          className={errors.username?.type ? errorInputClass : classes.input}
          placeholder="Password"
          ref={register({ required: true, minLength: 6, maxLength: 40 })}
          name="password"
        />
        {errors.password?.type === 'required' && <span className={classes.errorMessage}>This is a required field</span>}
        {errors.password?.type === 'maxLength' && (
          <span className={classes.errorMessage}>Your password needs to be no more 40 characters.</span>
        )}
        {errors.password?.type === 'minLength' && (
          <span className={classes.errorMessage}>Your username needs to be at least 6 characters.</span>
        )}
        <label className={classes.label} htmlFor="repeat">
          Repeat Password
        </label>
        <input
          id="repeat"
          type="password"
          className={errors.username?.type ? errorInputClass : classes.input}
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
