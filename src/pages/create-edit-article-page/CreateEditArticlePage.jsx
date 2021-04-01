import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { once } from 'lodash';
import CreateEditForm from '../../components/create-edit-form';
import { createArticleService, editArticleService, getArticleService } from '../../service/ArticleService';
import LocalStorageService from '../../service/StorageService';
import userActions from '../../reducers/userReducer/userActions';
import articleActions from '../../reducers/articleReducer/articleActions';
import listActions from '../../reducers/listReducer/listActions';
import Spinner from '../../components/spinner';

const CreateEditArticlePage = ({ match }) => {
  const dispatch = useDispatch();
  const createEditStatus = useSelector((state) => state.article.createEditStatus);
  const content = useSelector((state) => state.article.content);
  const userInfo = LocalStorageService.getUserInfo();
  const onLoad = useSelector((state) => state.article.onLoad);

  useEffect(() => {
    dispatch(listActions.changePage(1));
  }, [dispatch]);

  if (userInfo === '') {
    return <Redirect to="/sign-in" />;
  }

  if (createEditStatus) {
    setTimeout(() => {
      dispatch(articleActions.changeCreateEditStatus(false));
    }, 500);
    return <Redirect to="/" />;
  }

  // Вариант формирования для create page ==================

  if (match.url === '/new-article') {
    const create = once((data) => {
      const { tagList } = data;
      const newTagsList = tagList.filter((item) => item.tag.match(/[\S]/) !== null).map(({ tag }) => tag);
      const body = { article: { ...data, tagList: newTagsList } };

      createArticleService(body)
        .then((res) => {
          if (res.article) {
            dispatch(articleActions.changeCreateEditStatus(true));
          } else {
            dispatch(userActions.changeFetchFeil(true));
          }
        })
        .catch(() => dispatch(userActions.changeFetchFeil(true)));
    });

    return <CreateEditForm formTitle="Create new article" submitFunc={create} reset />;
  }

  // Вариант формирования для edit page ==================

  let slug;

  if (content) {
    slug = content.slug;
  } else {
    dispatch(articleActions.makeLoadStatus());
    getArticleService(match.params.slug)
      .then((data) => {
        if (data.author.username !== userInfo.username) {
          dispatch(articleActions.changeCreateEditStatus(true));
        }
        dispatch(articleActions.getArticle(data));
      })
      .catch((error) => dispatch(articleActions.failDownloadArticle(error.message)));
  }

  if (onLoad) {
    return <Spinner />;
  }

  const edit = once((data) => {
    const { tagList } = data;
    let newTagsList = tagList.filter((item) => item.tag.match(/[\S]/) !== null).map(({ tag }) => tag);

    if (!newTagsList || newTagsList.length < 1 || newTagsList === null) {
      newTagsList = [''];
    }
    const body = { article: { ...data, tagList: newTagsList } };

    editArticleService(slug, body)
      .then((res) => {
        if (res.article) {
          dispatch(articleActions.changeCreateEditStatus(true));
        } else {
          dispatch(userActions.changeFetchFeil(true));
        }
      })
      .catch(() => dispatch(userActions.changeFetchFeil(true)));
  });

  return <CreateEditForm formTitle="Edit article" submitFunc={edit} {...content} />;
};

CreateEditArticlePage.propTypes = {
  match: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.object])).isRequired,
};

export default CreateEditArticlePage;
