/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getArticleListService } from '../../service/ArticleService';
import Header from '../header/Header';
import ArticleList from '../article-list';
import ArticlePage from '../article-page';
import { getArticles, failDownloadArticles } from '../../reducers/listReducer/listActions';

import 'antd/dist/antd.css';

import classes from './App.module.scss';

const App = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.list.page);

  useEffect(() => {
    setTimeout(() => {
      getArticleListService(page)
        .then((data) => dispatch(getArticles(data)))
        .catch((error) => dispatch(failDownloadArticles(error.message)));
    }, 1000);
  }, [dispatch, page]);

  return (
    <section className={classes.app}>
      <Header />
      <Switch>
        <main className={classes.container}>
          <Route path="/" component={ArticleList} exact />
          <Route path="/:id" component={ArticlePage} />
          {/* <Redirect to="/home" /> */}
        </main>
      </Switch>
    </section>
  );
};

export default App;
