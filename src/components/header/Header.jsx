import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import userActions from '../../reducers/userReducer/userActions';

import avatar from './avatar.png';
import classes from './Header.module.scss';

const logout = (dispatch) => {
  localStorage.removeItem('user');
  dispatch(userActions.successAuth(false));
  dispatch(userActions.changeLoginStatus(false));
};

function Header() {
  const isLogin = useSelector((state) => state.user.isLogin);
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  const isLoginBlock = isLogin ? (
    <div className={classes.userBlock}>
      <Link to="/new-article" className={classes.createBtn}>
        Create article
      </Link>
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
      <div className={classes.container}>
        <Link to="/" className={classes.logo}>
          Realworld Blog
        </Link>
        {isLoginBlock}
      </div>
    </header>
  );
}

export default Header;
