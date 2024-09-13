import React from 'react'
import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import App from '../App'

import { ChangePasswordPage, EmailVerifyPage, ForgotPasswordPage, HomePage, LoginPage, PageNotFound, SignUpPage, UpdateProfile } from '../pages/index.pages'

const Routers = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<HomePage />} />
      <Route path='*' element={<PageNotFound />} />

      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path='/logout' element="logout successfully" />

      <Route path='/forgot-password' element={<ForgotPasswordPage />} />
      <Route path='/change-password/:token' element={<ChangePasswordPage />} />

      <Route path='/update-profile' element={<UpdateProfile />} />
      <Route path='/verify-email' element={<EmailVerifyPage />} />
    </Route>
  )
)

export default Routers