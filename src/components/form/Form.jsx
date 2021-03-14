import React from 'react';
import PropTypes from 'prop-types';
import FormFooter from '../form-footer';

import classes from './Form.module.scss';

const genStatusBlock = (status) => {
  const { email = null, username = null, errors = null } = status;
  const emailError = email ? <p className={classes.errorMessage}>{`E-Mail ${email}!`}</p> : null;
  const usernameError = username ? <p className={classes.errorMessage}>{`User Name ${username}!`}</p> : null;
  const authError = errors ? <p className={classes.errorMessage}>Login or password is not correct!</p> : null;

  let commonMessage;
  let styleBlock = classes.errorBlock;

  if (typeof status === 'string' && status === 'success') {
    styleBlock = classes.successBlock;
    commonMessage = (
      <>
        <p className={`${classes.successMessage} ${classes.successTitle}`}>Successfully!</p>
        <p className={classes.successMessage}>Redirect to next page in 3 sec...</p>
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
      {authError}
      {commonMessage}
    </div>
  );
};

const Form = ({ title, status, onSubmit, children, btnLabel, footer }) => (
  <div className={classes.formContainer}>
    <p className={classes.header}>{title}</p>
    {genStatusBlock(status)}
    <form className={classes.formBody} onSubmit={onSubmit}>
      {children}
      <button type="submit" className={classes.btn}>
        {btnLabel}
      </button>
    </form>
    {footer && <FormFooter {...footer} />}
  </div>
);

Form.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.object]),
  onSubmit: PropTypes.func.isRequired,
  btnLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  footer: PropTypes.objectOf(PropTypes.string),
};

Form.defaultProps = {
  status: null,
  footer: null,
};

export default Form;
