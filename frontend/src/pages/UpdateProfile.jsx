import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Loader, User } from 'lucide-react'
import { Input } from '../components/index.components'
import { userStore } from '../stores/user.store'
import { ArrowLeft } from 'lucide-react'
import { updateUserSchema } from '../utils/formValidate'
import { toast } from 'react-hot-toast'

function UpdateProfile() {
  const nav = useNavigate();
  const [imagePreview, setImagePreview] = useState(null)
  const { user, updateProfile, isLoading } = userStore();
  const [userData, setUserData] = useState({
    profileImage: null,
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

  const handelFileChange = (e) => {
    const file = e.target.files[0];
    setUserData({ ...userData, profileImage: file })

    const imageReader = new FileReader();
    imageReader.onload = () => (
      setImagePreview(imageReader.result)
    )

    if (file) {
      imageReader.readAsDataURL(file)
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateUserSchema.validate(userData, { abortEarly: false })
      const res = await updateProfile(userData)
      if (!user.isVerified) {
        nav("/verify-email")
      }
      toast.success(res)
      nav("/")
    } catch (err) {
      if (err.inner) toast.error(err.inner[0].message)
      toast.error(err.response.data.message)
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
            {user.profileImage || imagePreview ? (
              <img src={imagePreview ? imagePreview : import.meta.env.VITE_BACKEND_IMAGE_URL + user.profileImage} alt='Profile' className='rounded-full w-32 h-32 object-cover' />
            ) : (
              <div className='flex items-center justify-center rounded-full w-32 h-32 object-cover bg-[#C5CBCB] text-8xl'>
                {user.fullName[0].toUpperCase()}
              </div>
            )}
            <input type="file" name='profileImage' id='changeProfileImage' hidden onChange={handelFileChange} />
            <label htmlFor="changeProfileImage" className=' mt-4 bg-[#C5CBCB] rounded-2xl px-4 py-2'>Change Profile</label>
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
            type='text'
            placeholder='Email'
            name='email'
            defaultValue={userData.email}
            onChange={handelChange}
          />

          <Link to={'/update-password'}>
            <p className='text-green-500 font-semibold mb-4 inline-block'>Update Password</p>
          </Link>

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