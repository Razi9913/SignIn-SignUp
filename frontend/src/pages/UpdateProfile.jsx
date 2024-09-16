import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Loader, User } from 'lucide-react'
import { Input } from '../components/index.components'
import { userStore } from '../stores/user.store'
import { ArrowLeft } from 'lucide-react';

function UpdateProfile() {
  const nav = useNavigate();
  const [file, setFile] = useState(null)
  const { user, updateProfile, error, isLoading } = userStore();

  const [userData, setUserData] = useState({
    fullName: user.fullName,
    email: user.email,
  })

  const handelChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    })
  }

  const handelSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateProfile({ ...userData, profileImage: file })
      if (!user.isVerified) {
        nav("/verify-email")
      }
      nav("/")
    } catch (err) {
      console.log("handelSubmit error", err);
    }
  }

  return (
    <div className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md'>
        <Link to={"/"}>
          <p className='text-white flex items-center' >
            <ArrowLeft className='h-4 w-4 mr-2' />Back
          </p>
        </Link>
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
          Edit Your Profile
        </h2>
        {/* div which is full rounded with image link */}

        <form onSubmit={handelSubmit}>
          {/* image div */}
          <div className='flex flex-col items-center justify-center mb-6 '>
            {user.profileImage ? (
              <img src={user.profileImage} alt='Profile' className='rounded-full w-32 h-32 object-cover' />
            ) : (
              <div className='flex items-center justify-center rounded-full w-32 h-32 object-cover bg-[#C5CBCB] text-8xl'>
                {user.fullName[0].toUpperCase()}
              </div>
            )}
            <input type="file" name='profileImage' className=' mt-4 bg-[#C5CBCB] rounded-2xl px-4 py-2' placeholder='' onChange={e => setFile(e.target.files[0])} />
          </div>

          <p className='text-white'>Full Name</p>
          <Input
            icon={User}
            type='text'
            placeholder='Full Name'
            name='fullName'
            defaultValue={userData.fullName}
            onChange={handelChange}
          />

          <div className='flex justify-between'>
            <p className='text-white'>Email</p>
            <p className={`${user.isVerified ? "text-green-500" : "text-red-500"}`}>{user.isVerified ? "Email verified" : "Email not verified"}</p>
          </div>
          <Input
            icon={User}
            type='email'
            placeholder='Email'
            name='email'
            defaultValue={userData.email}
            onChange={handelChange}
          />

          {error && <p className='text-red-500 font-semibold mb-4'>{error}</p>}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50'
            type='submit' >
            {isLoading ? <Loader className='animate-spin mx-auto' /> : "Update Your Profile"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default UpdateProfile