import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PrivateRoute from '../private-route';
import Header from '../header/Header';
import ArticleListPage from '../../pages/article-list-page';
import ArticlePage from '../../pages/article-page';
import SignInPage from '../../pages/sign-in-page';
import SignUpPage from '../../pages/sign-up-page';
import UserProfilePage from '../../pages/user-profile-page';
import CreateEditArticlePage from '../../pages/create-edit-article-page';
import ModalFailWindow from '../modal-fail-window';
import userActions from '../../reducers/userReducer/userActions';
import LocalStorageService from '../../service/StorageService';

import { getUserDataService } from '../../service/UsersService';

import 'antd/dist/antd.css';

import classes from './App.module.scss';

const App = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);

  // Проверяет наличие токена в LS и получает данные пользователя => данные польз. и статус аутентификации в store;

  useEffect(() => {
    const token = LocalStorageService.getToken();
    if (token) {
      dispatch(userActions.successAuth());
      getUserDataService(token)
        .then((res) => {
          dispatch(userActions.successAuth(res.user));
          dispatch(userActions.changeLoginStatus(true));
        })
        .catch(() => {
          localStorage.removeItem('user');
        });
    }
  }, [dispatch]);

  return (
    <section className={classes.app}>
      <Header />

      <main className={classes.container}>
        <Switch>
          <PrivateRoute path="/sign-in" auth={!isLogin} component={SignInPage} link="/articles" />
          <PrivateRoute path="/sign-up" auth={!isLogin} component={SignUpPage} link="/profile" />
          <Route path="/profile" component={UserProfilePage} />
          <Route path="/new-article" component={CreateEditArticlePage} />
          <Route path="/articles/:slug/edit" component={CreateEditArticlePage} />
          <Route path="/articles/:slug" component={ArticlePage} />
          <Route path="/articles" component={ArticleListPage} />
          <Route path="/" component={ArticleListPage} />
        </Switch>
      </main>
      <ModalFailWindow />
    </section>
  );
};

export default App;
