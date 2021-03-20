/* eslint-disable import/prefer-default-export */
export const changeRegStatus = (errors) => ({ type: 'CHANGE_REG_STATUS', errors });

export const successRegistration = (status) => ({ type: 'SUCCESS_REGISTRATION', status });

export const changeAuthStatus = (errors) => ({ type: 'CHANGE_AUTH_STATUS', errors });

export const successAuth = (user) => ({ type: 'SUCCESS_AUTH', user });

export const changeEditStatus = (errors) => ({ type: 'CHANGE_EDIT_STATUS', errors });

export const successEditing = (user) => ({ type: 'SUCCESS_EDITING', user });

export const changeLoginStatus = (status) => ({ type: 'CHANGE_LOGIN_STATUS', status });
