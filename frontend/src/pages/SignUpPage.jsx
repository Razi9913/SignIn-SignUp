import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, Equal, Loader } from 'lucide-react';
import { Input, LoginSignUp, PasswordMatching, PasswordStrengthMeter } from '../components/index.components';
import { userStore } from '../stores/user.store.js';
import { signUpSchema } from '../utils/formValidate.js';
import { toast } from 'react-hot-toast';

function SignUpPage() {
  const nav = useNavigate();
  const [focusedField, setFocusedField] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [signUpData, setSignUpData] = useState({
    profileImage: null,
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  const handelFileChange = (e) => {
    const file = e.target.files[0];
    setSignUpData({ ...signUpData, profileImage: file })

    const imageReader = new FileReader();
    imageReader.onload = () => {
      setImagePreview(imageReader.result);
    };

    if (file) {
      imageReader.readAsDataURL(file);
    }
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const { isLoading, signUp } = userStore()

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUpSchema.validate(signUpData, { abortEarly: false });
      const res = await signUp(signUpData)
      toast.success(res)
      nav("/verify-email")
    } catch (err) {
      if (err.inner) return toast.error(err.inner[0].message)
      toast.error(err.response.data.message)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
			overflow-hidden' >
      <div className='p-8'>
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
          Create Account
        </h2>

        <form onSubmit={handelSubmit} encType='multipart/form-data'>

          <div className='flex flex-col items-center justify-center mb-6 '>
            <div className='flex items-center justify-center rounded-full w-32 h-32 object-cover bg-[#C5CBCB] text-8xl'>
              {imagePreview ? (
                <img src={imagePreview} alt='Profile' className='rounded-full w-32 h-32 object-cover ' />
              ) : (
                <img src='http://localhost:3000/image.png' alt='Profile' className='rounded-full w-32 h-32 object-cover ' />
              )}
            </div>
            <input type="file" name='profileImage' id='uploadProfile' hidden onChange={handelFileChange} />
            <label htmlFor="uploadProfile" className=' mt-4 bg-[#C5CBCB] rounded-2xl px-4 py-2'>Upload Profile</label>
          </div>

          <Input
            icon={User}
            type='text'
            placeholder='Full Name'
            name='fullName'
            value={signUpData.fullName}
            onChange={handleChange}
            key={1}
          />
          <Input
            icon={Mail}
            type='text'
            placeholder='Email Address'
            name='email'
            value={signUpData.email}
            onChange={handleChange}
            key={2}
          />
          <Input
            icon={Lock}
            type='password'
            placeholder='Password'
            name='password'
            value={signUpData.password}
            onChange={handleChange}
            onFocus={() => (handleFocus("password"))} // Show meter on focus
            onBlur={handleBlur} // Optionally hide meter on blur
            key={3}
          />
          <Input
            icon={Equal}
            type='password'
            placeholder='Confirm Password'
            name='confirmPassword'
            value={signUpData.confirmPassword}
            onChange={handleChange}
            onFocus={() => handleFocus("confirmPassword")} // Show meter on focus
            onBlur={handleBlur} // Optionally hide meter on blur
            key={4}
          />

          {/* password strength meter */}
          <AnimatePresence>
            {focusedField === "password" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }} >
                <PasswordStrengthMeter password={signUpData.password} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* password matching */}
          <AnimatePresence>
            {focusedField === "confirmPassword" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }} >
                <PasswordMatching password={signUpData.password} confirmPassword={signUpData.confirmPassword} />
              </motion.div>
            )}
          </AnimatePresence>
          {/* submit button */}
          <motion.button
            className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-green-600
						hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
					focus:ring-offset-gray-900 transition duration-200'
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            type='submit' >
            {isLoading ? <Loader className='animate-spin mx-auto' /> : "Sign up"}
          </motion.button>
        </form>
      </div>
      {/* component */}
      <LoginSignUp page={"/login"} name={"Login"} text={"Already have an account?"} />
    </motion.div>
  )
}

export default SignUpPage