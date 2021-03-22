import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeFetchFeil } from '../../reducers/userReducer/userActions';

import classes from './ModalFailWindow.module.scss';

const ModalFailWindow = () => {
  const dispatch = useDispatch();
  const fetchFail = useSelector((state) => state.user.fetchFail);

  if (fetchFail) {
    setTimeout(() => dispatch(changeFetchFeil(false)), 3500);

    return (
      <div className={classes.modalWindow}>
        <p className={classes.message}>Something was wrong...</p>
        <p className={classes.message}>Check your internet connection and the authentication status on the site.</p>
      </div>
    );
  }

  return null;
};
export default ModalFailWindow;
