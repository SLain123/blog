import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { changeUserData } from '../../service/UserService';
import { errorWithEditing, successEditing } from '../../reducers/userReducer/userActions';

import classes from '../../style/formStyle.module.scss';

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

const UserProfile = () => {
  const dispatch = useDispatch();
  const statusEdit = useSelector((state) => state.user.statusEdit);
  const statusMessage = statusEdit ? genStatusBlock(statusEdit) : null;

  const errorInputClass = `${classes.input} ${classes.errorInput}`;
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    changeUserData(data, userInfo.token)
      .then((res) => {
        if (res.errors) {
          dispatch(errorWithEditing(res.errors));
        } else {
          dispatch(errorWithEditing(false));
          dispatch(successEditing(res.user));
          localStorage.setItem('user', JSON.stringify(res.user));
        }
      })
      .catch((error) => {
        dispatch(errorWithEditing(error.message));
      });
  };

  return (
    <div className={classes.formContainer}>
      <p className={classes.header}>Edit Profile</p>
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
          ref={register({ required: true })}
          name="username"
        />
        {errors.username?.type === 'required' && <span className={classes.errorMessage}>This is a required field</span>}
        <label className={classes.label} htmlFor="email">
          Email address
        </label>
        <input
          id="email"
          type="input"
          className={errors.email?.type ? errorInputClass : classes.input}
          placeholder="Email address"
          ref={register({
            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}$/,
            required: true,
          })}
          name="email"
        />
        {errors.email?.type === 'required' && <span className={classes.errorMessage}>This is a required field</span>}
        {errors.email?.type === 'pattern' && (
          <span className={classes.errorMessage}>You need specify a valid email address</span>
        )}
        <label className={classes.label} htmlFor="password">
          New password
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
        <label className={classes.label} htmlFor="avatar">
          Avatar image (url)
        </label>
        <input
          id="avatar"
          type="input"
          className={errors.avatar?.type ? errorInputClass : classes.input}
          placeholder="Avatar image"
          ref={register({
            pattern: /^(https?:\/\/)+([a-zA-Z0-9_.]+)\.([a-z]{2,6}\.?)(\/[a-zA-Z0-9_.]*)*\/?$/,
          })}
          name="avatar"
        />
        {errors.avatar?.type === 'pattern' && (
          <span className={classes.errorMessage}>You need specify a valid URL for image</span>
        )}
        <button type="submit" className={classes.btn}>
          Save
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
