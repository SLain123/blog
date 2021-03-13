/* eslint-disable import/prefer-default-export */
export const errorWithRegistration = (errors) => ({ type: 'ERROR_WITH_REGISTRATION', errors });

export const successRegistration = (status) => ({ type: 'SUCCESS_REGISTRATION', status });

export const errorWithAuth = (errors) => ({ type: 'ERROR_WITH_AUTH', errors });

export const successAuth = (user) => ({ type: 'SUCCESS_AUTH', user });

export const errorWithEditing = (errors) => ({ type: 'ERROR_WITH_EDITING', errors });

export const successEditing = (user) => ({ type: 'SUCCESS_EDITING', user });
