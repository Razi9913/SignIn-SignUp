import React from 'react'

function PasswordMatching({ password, confirmPassword }) {
  return (
    <div className='mt-2'>
      <div className='flex justify-between items-center mb-1'>
        {password === confirmPassword && password.length > 0 ? (
          <span className='text-xs text-green-500'>Password match</span>
        ) : (
          <span className='text-xs text-gray-400'>Password not match</span>
        )}
      </div>
    </div>
  )
}

export default PasswordMatching