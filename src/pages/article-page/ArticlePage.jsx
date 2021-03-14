import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import gfm from 'remark-gfm';
import { getArticleService } from '../../service/ArticleService';
import { getArticle, failDownloadArticle, makeLoadStatus } from '../../reducers/articleReducer/articleActions';
import Tags from '../../components/tags';
import Spinner from '../../components/spinner';
import ErrorMessage from '../../components/error-message';

import like from '../../components/article-item/like.svg';

import classes from './ArticlePage.module.scss';

function ArticlePage({ match }) {
  const dispatch = useDispatch();
  const articleContent = useSelector((state) => state.article.content);
  const onLoad = useSelector((state) => state.article.onLoad);
  const onFail = useSelector((state) => state.article.onFail);
  const articleUrl = match.params.slug;

  useEffect(() => {
    dispatch(makeLoadStatus());
    getArticleService(articleUrl)
      .then((data) => dispatch(getArticle(data)))
      .catch((error) => dispatch(failDownloadArticle(error.message)));
  }, [dispatch, articleUrl]);

  if (onLoad) {
    return <Spinner />;
  }

  if (onFail) {
    return <ErrorMessage errorMessage={onFail} />;
  }

  if (articleContent !== null) {
    const { title, body, author, createdAt, description, favoritesCount, tagList } = articleContent;
    const { image, username } = author;

    return (
      <div className={classes.article}>
        <div className={classes.header}>
          <div className={classes.headContainer}>
            <div className={classes.headInfo}>
              <span className={classes.title}>{title}</span>
              <div className={classes.like}>
                <img src={like} alt="like" width="16" height="15" className={classes.likePic} />
                <span className={classes.likeCount}>{favoritesCount}</span>
              </div>
            </div>
            <Tags tags={tagList} />
            <p className={classes.description}>{description}</p>
          </div>
          <div className={classes.authorInfo}>
            <div className={classes.authorContainer}>
              <span className={classes.name}>{username}</span>
              <span className={classes.date}>{format(new Date(createdAt), 'MMMM d, y')}</span>
            </div>
            <picture>
              <source srcSet={image} />
              <img src={image} alt="avatar" className={classes.avatar} width="46" height="46" />
            </picture>
          </div>
        </div>
        <ReactMarkdown className={classes.text} plugins={[gfm]}>
          {body}
        </ReactMarkdown>
      </div>
    );
  }

  return null;
}

ArticlePage.propTypes = {
  match: PropTypes.exact({
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string,
    isExact: PropTypes.bool,
  }).isRequired,
};

export default ArticlePage;
