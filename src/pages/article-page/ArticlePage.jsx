import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import gfm from 'remark-gfm';
import { getArticleService, editArticle } from '../../service/ArticleService';
import {
  getArticle,
  failDownloadArticle,
  makeLoadStatus,
  changeIsUserEditStatus,
  changeCreateEditStatus,
  changeDisplayModalStatus,
} from '../../reducers/articleReducer/articleActions';
import Tags from '../../components/tags';
import Spinner from '../../components/spinner';
import ErrorMessage from '../../components/error-message';
import AcceptModal from '../../components/accept-modal';

import like from '../../components/article-item/like.svg';

import classes from './ArticlePage.module.scss';

const ArticlePage = ({ match }) => {
  const dispatch = useDispatch();
  const articleContent = useSelector((state) => state.article.content);
  const onLoad = useSelector((state) => state.article.onLoad);
  const onFail = useSelector((state) => state.article.onFail);
  const articleUrl = match.params.slug;
  const avatar = 'https://static.productionready.io/images/smiley-cyrus.jpg';
  const content = useSelector((state) => state.article.content);
  const createEditStatus = useSelector((state) => state.article.createEditStatus);

  const isUserEdit = useSelector((state) => state.article.isUserEdit);
  const isDisplayModal = useSelector((state) => state.article.displayModal);

  const userData = JSON.parse(localStorage.getItem('user'));
  const controlBlock = (
    <div className={classes.controlBlock}>
      <button
        type="button"
        className={`${classes.deleteBtn} ${classes.controlBtn}`}
        onClick={() => dispatch(changeDisplayModalStatus(true))}
      >
        Delete
      </button>
      <Link to={`/articles/${articleUrl}/edit`} className={`${classes.editBtn} ${classes.controlBtn}`}>
        Edit
      </Link>
      {isDisplayModal ? <AcceptModal /> : null}
    </div>
  );
  const isControl = isUserEdit ? controlBlock : null;

  // Загрузка данных single article;

  useEffect(() => {
    dispatch(makeLoadStatus());
    dispatch(changeIsUserEditStatus(false));
    dispatch(changeDisplayModalStatus(false));
    getArticleService(articleUrl)
      .then((data) => dispatch(getArticle(data)))
      .catch((error) => dispatch(failDownloadArticle(error.message)));
  }, [dispatch, articleUrl]);

  //  Проверка способности текущего пользователя редактировать статью;

  useEffect(() => {
    if (userData !== null && content) {
      editArticle(articleUrl, userData.token, content)
        .then((res) => {
          if (res.article) {
            dispatch(changeIsUserEditStatus(true));
          }
        })
        .catch(() => dispatch(changeIsUserEditStatus(false)));
    }
  }, [articleUrl, userData, content, dispatch]);

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
