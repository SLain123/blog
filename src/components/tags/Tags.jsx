import React from 'react';
import PropTypes from 'prop-types';

import classes from './Tags.module.scss';

const Tags = ({ tags }) => {
  const tagList = tags.map((tag) => (
    <button key={tag} className={classes.tagItem} type="button">
      {tag}
    </button>
  ));

  return <div className={classes.tags}>{tagList}</div>;
};

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Tags;
