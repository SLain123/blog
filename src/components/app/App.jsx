import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getArticleListService } from '../../service/ArticleService';
import Header from '../header/Header';
import ArticleListPage from '../../pages/article-list-page';
import ArticlePage from '../../pages/article-page';
import SignInPage from '../../pages/sign-in-page';
import SignUpPage from '../../pages/sign-up-page';
import UserProfilePage from '../../pages/user-profile-page';
import CreateArticlePage from '../../pages/create-article-page';
import { successAuth } from '../../reducers/userReducer/userActions';
import { getArticles, failDownloadArticles } from '../../reducers/listReducer/listActions';
import { getUserData } from '../../service/UserService';

import 'antd/dist/antd.css';

import classes from './App.module.scss';

const App = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.list.page);

  // Подгрузка списка статей на старте

  useEffect(() => {
    setTimeout(() => {
      getArticleListService(page)
        .then((data) => dispatch(getArticles(data)))
        .catch((error) => dispatch(failDownloadArticles(error.message)));
    }, 1000);
  }, [dispatch, page]);

  // Проверяет наличие токена в LS и получает данные пользователя;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      dispatch(successAuth());
      getUserData(user.token)
        .then((res) => dispatch(successAuth(res.user)))
        .catch(() => localStorage.removeItem('user'));
    }
  }, [dispatch]);

  return (
    <section className={classes.app}>
      <Header />

      <main className={classes.container}>
        <Switch>
          <Route path="/articles" component={ArticleListPage} exact />
          <Route path="/articles/:slug" component={ArticlePage} exact />
          <Route path="/sign-in" component={SignInPage} exact />
          <Route path="/sign-up" component={SignUpPage} exact />
          <Route path="/profile" component={UserProfilePage} exact />
          <Route path="/new-article" component={CreateArticlePage} exact />
          <Redirect path="*" to="/articles" />
        </Switch>
      </main>
    </section>
  );
};

export default App;

// <Route path="*" ></Route>
