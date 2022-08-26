import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../services/AuthService';

/**
 * Wrapper for <Route /> that redirects the user to /login if they are not authenticated.
 */
export default function PrivateRoute({ children, ...rest }) {
  if (!isLoggedIn()) {
    return (
      <Navigate
        to={{
          pathname: '/login',
          state: { from: rest.location },
        }}
      />
    );
  }

  return (
    children
  );
}

