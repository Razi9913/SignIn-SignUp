import React from 'react';
import { Navigate } from 'react-router-dom';
import { userStore } from '../stores/user.store.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

function ProtectedRoute({ element }) {
  const { isAuthenticated, user } = userStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // if (!user && isAuthenticated) {
  //   return <LoadingSpinner />;
  // }

  // If the user is authenticated but not verified and is trying to access non-verification pages, redirect them.
  if (user && !user.isVerified && window.location.pathname !== '/verify-email') {
    return <Navigate to="/verify-email" replace />;
  }

  return element;
}

function RedirectAuthenticatedUser({ element }) {
  const { isAuthenticated, user } = userStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return element;
}

export { ProtectedRoute, RedirectAuthenticatedUser };