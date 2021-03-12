/* eslint-disable import/prefer-default-export */
export const errorWithRegistration = (errors) => ({ type: 'ERROR_WITH_REGISTRATION', errors });

export const successRegistration = (status) => ({ type: 'SUCCESS_REGISTRATION', status });
