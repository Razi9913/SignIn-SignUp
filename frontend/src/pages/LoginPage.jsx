import React, { useState } from 'react'
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { Input, LoginSignUp } from '../components/index.components';
import { userStore } from '../stores/user.store';


function LoginPage() {
  const nav = useNavigate();

  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  const { error, isLoading, login, user } = userStore()
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(signUpData);
      if (!user?.isVerified) {
        nav("/verify-email");
      }
      nav("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
      <div className='p-8'>
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
          Welcome Back
        </h2>

        <form onSubmit={handleLogin}>
          <Input
            icon={Mail}
            type='email'
            placeholder='Email Address'
            name='email'
            value={signUpData.email}
            onChange={handleChange}
          />

          <Input
            icon={Lock}
            type='password'
            placeholder='Password'
            name='password'
            value={signUpData.password}
            onChange={handleChange}
          />

          <div className='flex items-center mb-6'>
            <Link to='/forgot-password' className='text-sm text-green-400 hover:underline'>
              Forgot password?
            </Link>
          </div>

          {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}

          <motion.button
            className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-green-600
						hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
					focus:ring-offset-gray-900 transition duration-200'
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type='submit'>
            {isLoading ? <Loader className='animate-spin mx-auto' /> : "Login"}
          </motion.button>
        </form>
      </div>
      <LoginSignUp page={"/signup"} name={"Sign up"} text={"Don't have an account?"} />
    </motion.div>
  )
}

export default LoginPage