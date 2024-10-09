import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Input, LoginSignUp, PasswordMatching, PasswordStrengthMeter } from "../components/index.components";
import { userStore } from "../stores/user.store.js";
import { Equal, Lock } from "lucide-react";
import { toast } from 'react-hot-toast'
import { passwordSchema } from '../utils/formValidate.js';

const UpdatePasswordPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const nav = useNavigate();
  const [userData, setUserData] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    })
  }

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };
  const handleBlur = () => {
    setFocusedField("");
  };

  const { isLoading, updatePassword } = userStore()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await passwordSchema.validate(userData, { abortEarly: false })
      const res = await updatePassword(userData.password)
      toast.success(res)
      nav('/')
    } catch (err) {
      if (err.inner) toast.error(err.inner[0].message)
      toast.error(err.response.data.message)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden' >
      <div className='p-8'>
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
          Change Password
        </h2>

        {!isSubmitted ? (
          <>
            <p className='text-gray-300 mb-6 text-center'>
              Do you want to change password. Please Confirm it.
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
              type='button'
              onClick={() => (setIsSubmitted(true))}>
              Confirm
            </motion.button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>

            <Input
              icon={Lock}
              type='password'
              placeholder='Password'
              name='password'
              value={userData.password}
              onChange={handleChange}
              onFocus={() => (handleFocus("password"))} // Show meter on focus
              onBlur={handleBlur} // Optionally hide meter on blur
            />
            <Input
              icon={Equal}
              type='password'
              placeholder='Confirm Password'
              name='confirmPassword'
              value={userData.confirmPassword}
              onChange={handleChange}
              onFocus={() => handleFocus("confirmPassword")} // Show meter on focus
              onBlur={handleBlur} // Optionally hide meter on blur
            />

            {/* password strength meter */}
            <AnimatePresence>
              {focusedField === "password" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }} >
                  <PasswordStrengthMeter password={userData.password} />
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
                  <PasswordMatching password={userData.password} confirmPassword={userData.confirmPassword} />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 mt-4'
              type='submit'
              disabled={isLoading} >
              {isLoading ? "Updating Password..." : "Set New Password"}
            </motion.button>
          </form>
        )}
      </div>

      <LoginSignUp page={"/update-profile"} name={"Back to Home"} />
    </motion.div>
  );
};
export default UpdatePasswordPage;