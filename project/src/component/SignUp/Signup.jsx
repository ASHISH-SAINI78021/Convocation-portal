import React from 'react'
import Form from './Form'

const Login = () => {
  return (
    <div className='flex w-full h-screen'>
      <div className='w-full flex items-center justify-center lg:w-1/2'>
        <Form />
      </div>
      <div className='hidden relative lg:flex h-full w-1/2 bg-gray-200 items-center justify-center'>
            <div className='w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-spin' />
            <div className='w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg' />
      </div>
    </div>
  )
}

export default Login
