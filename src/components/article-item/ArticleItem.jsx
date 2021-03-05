/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

import like from './like.svg';

import classes from './ArticleItem.module.scss';

const ArticleItem = ({
  title,
  author,
  body,
  createdAt,
  description,
  favorited,
  favoritesCount,
  slug,
  tagList,
  updatedAt,
}) => {
  const { image, username } = author;

  return (
    <li className={classes.item}>
      <div className={classes.header}>
        <div className={classes.headContainer}>
          <div className={classes.headInfo}>
            <span className={classes.title}>{title}</span>
            <div className={classes.like}>
              <img src={like} alt="like" width="16" height="15" className={classes.likePic} />
              <span className={classes.likeCount}>12</span>
            </div>
          </div>
          <div className={classes.tags}>
            <button className={classes.tagItem}>Tag1</button>
          </div>
        </div>
        <div className={classes.authorInfo}>
          <div className={classes.authorContainer}>
            <span className={classes.name}>{username}</span>
            <span className={classes.date}>{createdAt}</span>
          </div>
          <picture>
            <source srcSet={image} />
            <img src={image} alt="avatar" className={classes.avatar} width="46" height="46" />
          </picture>
        </div>
      </div>
      <p className={classes.text}>{body}</p>
    </li>
  );
};

export default ArticleItem;
