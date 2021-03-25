import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { removeArticleService } from '../../service/ArticleService';
import userActions from '../../reducers/userReducer/userActions';
import articleActions from '../../reducers/articleReducer/articleActions';

import alarmSvg from './al.svg';
import classes from './AcceptModal.module.scss';

const AcceptModal = () => {
  const dispatch = useDispatch();
  const createEditStatus = useSelector((state) => state.article.createEditStatus);
  const content = useSelector((state) => state.article.content);

  if (createEditStatus) {
    setTimeout(() => {
      dispatch(articleActions.changeCreateEditStatus(false));
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
            dispatch(articleActions.changeDisplayModalStatus(false));
          }}
        >
          No
        </button>
        <button
          type="button"
          className={`${classes.btn} ${classes.yes}`}
          onClick={() => {
            dispatch(articleActions.changeDisplayModalStatus(false));
            removeArticleService(content.slug)
              .then((res) => {
                if (!res.error) {
                  dispatch(articleActions.changeCreateEditStatus(true));
                } else {
                  dispatch(userActions.changeFetchFeil(true));
                }
              })
              .catch(() => dispatch(userActions.changeFetchFeil(true)));
          }}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default AcceptModal;
