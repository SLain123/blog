import React from 'react';
import { Pagination } from 'antd';
import Header from '../header/Header';
import ArticleList from '../article-list';

import 'antd/dist/antd.css';

import classes from './App.module.scss';

const App = () => (
  <section className={classes.app}>
    <Header />
    <main className={classes.container}>
      <ArticleList />
      <Pagination
        size="small"
        total={500}
        current={1}
        pageSize={5}
        showSizeChanger={false}
        onChange={(pageNum) => console.log(pageNum)}
      />
    </main>
  </section>
);

export default App;
