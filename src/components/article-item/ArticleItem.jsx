/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import Tags from '../tags';

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
  let { image, username } = author;

  if (image === '' || image === null) {
    image = 'https://static.productionready.io/images/smiley-cyrus.jpg';
  }

  if (image === '' || image === null) {
    username = 'Anonymous';
  }

  return (
    <li className={classes.item}>
      <div className={classes.header}>
        <div className={classes.headContainer}>
          <div className={classes.headInfo}>
            <Link to={`/articles/${slug}`} className={classes.title}>
              {title}
            </Link>
            <div className={classes.like}>
              <img src={like} alt="like" width="16" height="15" className={classes.likePic} />
              <span className={classes.likeCount}>{favoritesCount}</span>
            </div>
          </div>
          <Tags tags={tagList} />
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
      <p className={classes.description}>{description}</p>
    </li>
  );
};

export default ArticleItem;
