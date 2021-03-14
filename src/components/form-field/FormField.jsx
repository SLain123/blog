/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React from 'react';

import classes from './FormField.module.scss';

const FormField = ({ name, label, type, errors, placeholder, thisRef, errorOptions }) => {
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

export default FormField;
