import React from 'react';
import { Navigate } from 'react-router-dom';
import { userStore } from '../stores/user.store.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

function ProtectedRoute({ element }) {
  const { isAuthenticated, user } = userStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated but not verified and is trying to access non-verification pages, redirect them.
  if (!user.isVerified && window.location.pathname !== '/verify-email') {
    return <Navigate to="/verify-email" replace />;
  }

  return element;
}

function RedirectAuthenticatedUser({ element }) {
  const { isAuthenticated, user } = userStore();

  // Redirect verified users away from login, signup, and verify-email routes
  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return element;
}

export { ProtectedRoute, RedirectAuthenticatedUser };
