import React from 'react';
import PropTypes from 'prop-types';

import classes from './FormField.module.scss';

const FormField = ({ name, label, type, errors, placeholder, thisRef, errorOptions, value }) => {
  const errorInputClass = `${classes.input} ${classes.errorInput}`;

  return (
    <>
      <label className={classes.label} htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        type={type}
        className={errors[name]?.type ? errorInputClass : classes.input}
        placeholder={placeholder}
        ref={thisRef}
        name={name}
        defaultValue={value}
      />
      {errorOptions.map(
        ({ target, message }) =>
          errors[name]?.type === target && (
            <span key={`${target}-${message}`} className={classes.errorMessage}>
              {message}
            </span>
          )
      )}
    </>
  );
};

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  errors: PropTypes.objectOf(PropTypes.object).isRequired,
  placeholder: PropTypes.string.isRequired,
  thisRef: PropTypes.func.isRequired,
  errorOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.string,
};

FormField.defaultProps = {
  value: '',
};

export default FormField;
