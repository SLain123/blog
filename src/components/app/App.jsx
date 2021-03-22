/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PrivateRoute from '../private-route';
import Header from '../header/Header';
import ArticleListPage from '../../pages/article-list-page';
import ArticlePage from '../../pages/article-page';
import SignInPage from '../../pages/sign-in-page';
import SignUpPage from '../../pages/sign-up-page';
import UserProfilePage from '../../pages/user-profile-page';
import CreateArticlePage from '../../pages/create-article-page';
import EditArticlePage from '../../pages/edit-article-page';
import ModalFailWindow from '../modal-fail-window';
import { successAuth, changeLoginStatus } from '../../reducers/userReducer/userActions';
import getToken from '../../service/StorageService';

import { getUserDataService } from '../../service/UserService';

import 'antd/dist/antd.css';

import classes from './App.module.scss';

const App = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);

  // Проверяет наличие токена в LS и получает данные пользователя => данные польз. и статус аутентификации в store;

  useEffect(() => {
    const token = getToken();
    if (token) {
      dispatch(successAuth());
      getUserDataService(token)
        .then((res) => {
          dispatch(successAuth(res.user));
          dispatch(changeLoginStatus(true));
        })
        .catch(() => localStorage.removeItem('user'));
    }
  }, [dispatch]);

  return (
    <section className={classes.app}>
      <Header />

      <main className={classes.container}>
        <Switch>
          <PrivateRoute path="/sign-in" auth={!isLogin} component={SignInPage} link="/articles" />
          <PrivateRoute path="/sign-up" auth={!isLogin} component={SignUpPage} link="/profile" />
          <PrivateRoute path="/profile" auth={isLogin} component={UserProfilePage} link="/sign-in" />
          <PrivateRoute path="/new-article" auth={isLogin} component={CreateArticlePage} link="/sign-in" />
          <PrivateRoute path="/articles/:slug/edit" auth={isLogin} component={EditArticlePage} link="/sign-in" />
          <Route path="/articles/:slug" component={ArticlePage} />
          <Route path="/articles" component={ArticleListPage} />
          <Redirect path="*" to="/articles" />
        </Switch>
      </main>
      <ModalFailWindow />
    </section>
  );
};

export default App;
