/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CreateEditForm from '../../components/create-edit-form';
import { editArticle } from '../../service/ArticleService';
import { changeCreateEditStatus } from '../../reducers/articleReducer/articleActions';

const EditArticlePage = () => {
  const dispatch = useDispatch();
  const createEditStatus = useSelector((state) => state.article.createEditStatus);
  const content = useSelector((state) => state.article.content);
  const { slug } = content;
  const redirectUrl = `/articles/${slug}`;

  const edit = (data) => {
    const { tagList } = data;
    let newTagsList = tagList.filter((item) => item.tag.match(/[\S]/) !== null).map(({ tag }) => tag);

    if (!newTagsList || newTagsList.length < 1 || newTagsList === null) {
      newTagsList = [''];
    }
    const body = { article: { ...data, tagList: newTagsList } };

    const userData = JSON.parse(localStorage.getItem('user'));

    editArticle(slug, userData.token, body).then((res) => {
      if (res.article) {
        dispatch(changeCreateEditStatus(true));
      }

      return null;
    });
  };

  if (createEditStatus) {
    setTimeout(() => {
      dispatch(changeCreateEditStatus(false));
    }, 500);
    return <Redirect to={redirectUrl} />;
  }

  return <CreateEditForm formTitle="Edit article" submitFunc={edit} {...content} />;
};

export default EditArticlePage;
