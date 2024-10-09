import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import App from '../App';

import { ChangePasswordPage, EmailVerifyPage, ForgotPasswordPage, HomePage, LoginPage, PageNotFound, SignUpPage, UpdatePasswordPage, UpdateProfile } from '../pages/index.pages';
import { ProtectedRoute, RedirectAuthenticatedUser } from './ProtectedRoute';

const Routers = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<ProtectedRoute element={<HomePage />} />} />
      <Route path="*" element={<PageNotFound />} />

      <Route path="/login" element={<RedirectAuthenticatedUser element={<LoginPage />} />} />
      <Route path="/signup" element={<RedirectAuthenticatedUser element={<SignUpPage />} />} />

      <Route path="/forgot-password" element={<RedirectAuthenticatedUser element={<ForgotPasswordPage />} />} />
      <Route path="/change-password/:token" element={<RedirectAuthenticatedUser element={<ChangePasswordPage />} />} />

      <Route path="/update-profile" element={<ProtectedRoute element={<UpdateProfile />} />} />
      <Route path="/update-password" element={<ProtectedRoute element={<UpdatePasswordPage />} />} />

      {/* Protected route to ensure only non-verified users can access this */}
      <Route path="/verify-email" element={<ProtectedRoute element={<EmailVerifyPage />} />} />
    </Route>
  )
);

export default Routers;