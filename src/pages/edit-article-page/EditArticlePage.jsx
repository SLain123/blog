import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CreateEditForm from '../../components/create-edit-form';
import { editArticleService } from '../../service/ArticleService';
import { changeFetchFeil } from '../../reducers/userReducer/userActions';
import { changeCreateEditStatus } from '../../reducers/articleReducer/articleActions';

const EditArticlePage = () => {
  const dispatch = useDispatch();
  const createEditStatus = useSelector((state) => state.article.createEditStatus);
  const content = useSelector((state) => state.article.content);
  const { slug } = content;

  const edit = (data) => {
    const { tagList } = data;
    let newTagsList = tagList.filter((item) => item.tag.match(/[\S]/) !== null).map(({ tag }) => tag);

    if (!newTagsList || newTagsList.length < 1 || newTagsList === null) {
      newTagsList = [''];
    }
    const body = { article: { ...data, tagList: newTagsList } };

    editArticleService(slug, body)
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

  return <CreateEditForm formTitle="Edit article" submitFunc={edit} {...content} />;
};

export default EditArticlePage;
