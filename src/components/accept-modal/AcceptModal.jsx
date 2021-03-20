import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { removeArticle } from '../../service/ArticleService';
import { changeCreateEditStatus, changeDisplayModalStatus } from '../../reducers/articleReducer/articleActions';

import alarmSvg from './al.svg';
import classes from './AcceptModal.module.scss';

const AcceptModal = () => {
  const dispatch = useDispatch();
  const createEditStatus = useSelector((state) => state.article.createEditStatus);
  const content = useSelector((state) => state.article.content);
  const userData = JSON.parse(localStorage.getItem('user'));

  if (createEditStatus) {
    setTimeout(() => {
      dispatch(changeCreateEditStatus(false));
    }, 500);
    return <Redirect to="/articles" />;
  }

  return (
    <div className={classes.modalContainer}>
      <div className={classes.messageContainer}>
        <img src={alarmSvg} alt="alarm" className={classes.alarm} width="14" height="14" />
        <span className={classes.message}>Are you sure to delete this article?</span>
      </div>
      <div className={classes.btnContainer}>
        <button
          type="button"
          className={`${classes.btn} ${classes.no}`}
          onClick={() => {
            dispatch(changeDisplayModalStatus(false));
          }}
        >
          No
        </button>
        <button
          type="button"
          className={`${classes.btn} ${classes.yes}`}
          onClick={() => {
            dispatch(changeDisplayModalStatus(false));
            removeArticle(content.slug, userData.token).then((res) => {
              if (!res.error) {
                dispatch(changeCreateEditStatus(true));
              }
            });
          }}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default AcceptModal;
