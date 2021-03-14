import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from 'antd';
import { uniqueId } from 'lodash';
import ArticleItem from '../../components/article-item';
import { changePage } from '../../reducers/listReducer/listActions';
import Spinner from '../../components/spinner';
import ErrorMessage from '../../components/error-message';

import classes from './ArticleListPage.module.scss';
import './pagination.scss';

const ArticleListPage = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.list.articles);
  const articlesCount = useSelector((state) => state.list.articlesCount);
  const page = useSelector((state) => state.list.page);
  const onLoad = useSelector((state) => state.list.onLoad);
  const onFail = useSelector((state) => state.list.onFail);

  if (onLoad) {
    return <Spinner />;
  }

  if (onFail) {
    return <ErrorMessage errorMessage={onFail} />;
  }

  return (
    <ul className={classes.list}>
      {articles.map((article) => (
        <ArticleItem {...article} key={uniqueId('art_')} />
      ))}
      <Pagination
        size="small"
        total={articlesCount}
        current={page}
        pageSize={5}
        showSizeChanger={false}
        onChange={(pageNum) => dispatch(changePage(pageNum))}
      />
    </ul>
  );
};

export default ArticleListPage;
