import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CreateEditForm from '../../components/create-edit-form';
import { createArticleService } from '../../service/ArticleService';
import { changeFetchFeil } from '../../reducers/userReducer/userActions';
import { changeCreateEditStatus } from '../../reducers/articleReducer/articleActions';
import { changePage } from '../../reducers/listReducer/listActions';

const CreateArticlePage = () => {
  const dispatch = useDispatch();
  const createEditStatus = useSelector((state) => state.article.createEditStatus);

  useEffect(() => {
    dispatch(changePage(1));
  }, [dispatch]);

  const create = (data) => {
    const { tagList } = data;
    const newTagsList = tagList.filter((item) => item.tag.match(/[\S]/) !== null).map(({ tag }) => tag);
    const body = { article: { ...data, tagList: newTagsList } };

    createArticleService(body)
      .then((res) => {
        if (res.article) {
          dispatch(changeCreateEditStatus(true));
        } else {
          dispatch(changeFetchFeil(true));
        }
      })
      .catch(() => dispatch(changeFetchFeil(true)));
  };

  if (createEditStatus) {
    setTimeout(() => {
      dispatch(changeCreateEditStatus(false));
    }, 500);
    return <Redirect to="/articles" />;
  }

  return <CreateEditForm formTitle="Create new article" submitFunc={create} />;
};

export default CreateArticlePage;
