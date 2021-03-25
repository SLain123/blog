import React, { useEffect, useCallback } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import gfm from 'remark-gfm';
import { useSpring, animated } from 'react-spring';

import { useDispatch, useSelector } from 'react-redux';
import {
  getArticle,
  failDownloadArticle,
  makeLoadStatus,
  changeIsUserEditStatus,
  changeCreateEditStatus,
  changeDisplayModalStatus,
} from '../../reducers/articleReducer/articleActions';
import { changeFetchFeil } from '../../reducers/userReducer/userActions';

import LocalStorageService from '../../service/StorageService';
import { getArticleService, editArticleService } from '../../service/ArticleService';

import Tags from '../../components/tags';
import Spinner from '../../components/spinner';
import ErrorMessage from '../../components/error-message';
import AcceptModal from '../../components/accept-modal';
import Like from '../../components/like';

import classes from './ArticlePage.module.scss';

const ArticlePage = ({ match }) => {
  const dispatch = useDispatch();
  const articleContent = useSelector((state) => state.article.content);
  const onLoad = useSelector((state) => state.article.onLoad);
  const onFail = useSelector((state) => state.article.onFail);
  const createEditStatus = useSelector((state) => state.article.createEditStatus);
  const isUserEdit = useSelector((state) => state.article.isUserEdit);
  const isDisplayModal = useSelector((state) => state.article.displayModal);

  const token = LocalStorageService.getToken();
  const { slug } = match.params;
  const avatar = 'https://static.productionready.io/images/smiley-cyrus.jpg';

  const positionAnimate = useSpring({
    transform: 'scale(1)',
    opacity: 1,
    from: { transform: 'scale(0)', opacity: 0 },
    config: { duration: 1300 },
  });

  const controlBlock = (
    <animated.div className={classes.controlBlock} style={positionAnimate}>
      <button
        type="button"
        className={`${classes.deleteBtn} ${classes.controlBtn}`}
        onClick={() => dispatch(changeDisplayModalStatus(true))}
      >
        Delete
      </button>
      <Link to={`/articles/${slug}/edit`} className={`${classes.editBtn} ${classes.controlBtn}`}>
        Edit
      </Link>
      {isDisplayModal ? <AcceptModal /> : null}
    </animated.div>
  );
  const isControl = isUserEdit ? controlBlock : null;

  // Загрузка данных single article;

  const downloadArticle = useCallback(() => {
    dispatch(makeLoadStatus());
    dispatch(changeIsUserEditStatus(false));
    dispatch(changeDisplayModalStatus(false));
    getArticleService(slug)
      .then((data) => dispatch(getArticle(data)))
      .catch((error) => dispatch(failDownloadArticle(error.message)));
  }, [slug, dispatch]);

  useEffect(() => {
    downloadArticle();
  }, [downloadArticle]);

  //  Проверка способности текущего пользователя редактировать статью;

  useEffect(() => {
    if (token && articleContent) {
      editArticleService(slug, articleContent)
        .then((res) => {
          if (res.article) {
            dispatch(changeIsUserEditStatus(true));
          }
        })
        .catch(() => {
          dispatch(changeFetchFeil(true));
          dispatch(changeIsUserEditStatus(false));
        });
    }
  }, [slug, token, articleContent, dispatch]);

  // Редирект если на страницу article при удачном удалении статьи;

  if (createEditStatus) {
    setTimeout(() => {
      dispatch(changeCreateEditStatus(false));
    }, 500);
    return <Redirect to="/articles" />;
  }

  if (onLoad) {
    return <Spinner />;
  }

  if (onFail) {
    return <ErrorMessage errorMessage={onFail} />;
  }

  if (articleContent !== null) {
    const { title, body, author, createdAt, description, favoritesCount, tagList, favorited } = articleContent;
    const { image, username } = author;

    return (
      <div className={classes.article}>
        <div className={classes.header}>
          <div className={classes.headContainer}>
            <div className={classes.headInfo}>
              <span className={classes.title}>{title}</span>
              <Like favorited={favorited} favoritesCount={favoritesCount} slug={slug} />
            </div>
            <Tags tags={tagList} />
            <p className={classes.description}>{description}</p>
          </div>
          <div className={classes.authorInfo}>
            <div className={classes.authorContainer}>
              <span className={classes.name}>{username}</span>
              <span className={classes.date}>{format(new Date(createdAt), 'MMMM d, y')}</span>
            </div>
            <img src={image === '' ? avatar : image} alt="avatar" className={classes.avatar} width="46" height="46" />
            {isControl}
          </div>
        </div>
        <ReactMarkdown className={classes.text} plugins={[gfm]}>
          {body}
        </ReactMarkdown>
      </div>
    );
  }

  return null;
};

ArticlePage.propTypes = {
  match: PropTypes.exact({
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string,
    isExact: PropTypes.bool,
  }).isRequired,
};

export default ArticlePage;
