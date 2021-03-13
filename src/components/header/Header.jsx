/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { successAuth } from '../../reducers/userReducer/userActions';

import avatar from './avatar.png';
import classes from './Header.module.scss';

const logout = (dispatch) => {
  localStorage.removeItem('user');
  dispatch(successAuth(false));
};

function Header() {
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  const isLoginBlock = userInfo ? (
    <div className={classes.userBlock}>
      <button type="button" className={classes.createBtn}>
        Create article
      </button>
      <Link to="/profile" className={classes.userInfo}>
        <span className={classes.name}>{userInfo.username}</span>
        <img
          alt="avatar"
          src={userInfo.image ? userInfo.image : avatar}
          width="46"
          height="46"
          className={classes.img}
        />
      </Link>
      <button type="button" className={classes.logout} onClick={() => logout(dispatch)}>
        Log Out
      </button>
    </div>
  ) : (
    <nav>
      <Link to="/sign-in" className={classes.authBtn}>
        Sign In
      </Link>
      <Link to="/sign-up" className={`${classes.authBtn} ${classes.authBtn_active}`}>
        Sign Up
      </Link>
    </nav>
  );

  return (
    <header className={classes.header}>
      <Link to="/articles" className={classes.logo}>
        Realworld Blog
      </Link>
      {isLoginBlock}
    </header>
  );
}

export default Header;
