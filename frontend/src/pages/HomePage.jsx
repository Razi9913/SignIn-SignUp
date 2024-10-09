import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { userStore } from "../stores/user.store.js";
import toast from 'react-hot-toast';

const HomePage = () => {
  const nav = useNavigate();

  const { user, logout } = userStore()

  const handleLogout = async () => {
    try {
      const res = await logout()
      toast.success(res)
      nav("/login");
    } catch (err) {
      toast.error(err.response.data.message)
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className='max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800' >

      <div className='flex flex-col items-center justify-center mb-6'>
        {user.profileImage !== "" ? (
          <img src={import.meta.env.VITE_BACKEND_IMAGE_URL + user.profileImage} alt='Profile' className='rounded-full w-32 h-32 object-cover' />
        ) : (
          <div className='flex items-center justify-center rounded-full w-32 h-32 object-cover bg-[#C5CBCB] text-8xl'>
            {user.fullName[0].toUpperCase()}
          </div>
        )}
      </div>

      <div className='space-y-6'>
        <motion.div
          className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}>
          <h3 className='text-xl font-semibold text-green-400 mb-3'>Profile Information</h3>
          <p className='text-gray-300'>Name: {user?.fullName}</p>
          <p className='text-gray-300'>Email: {user?.email}</p>
          <p className='text-gray-300'>Email is: <span className={`${user?.isVerified ? "text-gray-300" : "text-green-500"}`}>{user?.isVerified ? "verified" : "not verified"}</span></p>
          <p className='text-gray-300'>Password: ##########</p>
        </motion.div>

        <motion.div
          className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }} >
          <h3 className='text-xl font-semibold text-green-400 mb-3'>Account Activity</h3>
          {/* Joined */}
          <p className='text-gray-300'>
            <span className='font-bold'>Joined: </span>
            {new Date(user?.createdAt).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              // second: "2-digit",
            })}
          </p>
          {/* Last Updated */}
          <p className='text-gray-300'>
            <span className='font-bold'>Last Updated: </span>
            {new Date(user?.updatedAt).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          {/* Last Login */}
          <p className='text-gray-300'>
            <span className='font-bold'>Last Login: </span>
            {new Date(user?.lastLogin).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className='mt-4' >
        <Link to={"/update-profile"} className='no-underline'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
				font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700
				focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 mb-4'>
            Edit Your Profile
          </motion.button>
        </Link>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
				font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700
				focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900'>
          Logout
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default HomePage;