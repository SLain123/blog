import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, auth, link, ...rest }) => {
  const result = (
    <Route {...rest} render={(props) => (auth === true ? <Component {...props} /> : <Redirect to={link} />)} />
  );

  return result;
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  link: PropTypes.string.isRequired,
  auth: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

PrivateRoute.defaultProps = {
  auth: false,
};

export default PrivateRoute;
