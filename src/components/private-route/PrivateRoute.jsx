import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, auth, link, ...rest }) => (
  <Route {...rest} render={(props) => (auth === false ? <Redirect to={link} /> : <Component {...props} />)} />
);

PrivateRoute.propTypes = {
  component: PropTypes.node.isRequired,
  link: PropTypes.string.isRequired,
  auth: PropTypes.bool.isRequired,
};

export default PrivateRoute;
