import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import Tags from '../tags';
import Like from '../like';

import classes from './ArticleItem.module.scss';

const ArticleItem = ({ title, author, createdAt, description, favoritesCount, slug, tagList, favorited, index }) => {
  const positionAnimate = useSpring({
    transform: 'translateX(0)',
    from: { transform: 'translateX(-270%)' },
    config: { duration: 600 },
    delay: index * 80,
  });

  let { image, username } = author;

  if (image === '' || image === null) {
    image = 'https://static.productionready.io/images/smiley-cyrus.jpg';
  }

  if (image === '' || image === null) {
    username = 'Anonymous';
  }

  return (
    <animated.li className={classes.item} style={positionAnimate}>
      <div className={classes.header}>
        <div className={classes.headContainer}>
          <div className={classes.headInfo}>
            <Link to={`/articles/${slug}`} className={classes.title}>
              {title}
            </Link>
            <Like favorited={favorited} favoritesCount={favoritesCount} slug={slug} />
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
    </animated.li>
  );
};

ArticleItem.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])).isRequired,
  createdAt: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  favoritesCount: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
  favorited: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};

export default ArticleItem;
