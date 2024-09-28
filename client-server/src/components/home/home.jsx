import React from 'react'
import Main from '../../assets/main.jpg'
import { Link } from 'react-router-dom'
export default function Home() {
  return (
    <>
    <div style={{backgroundImage:`url(${Main})`}} className='relative w-full bg-center'>
    <div className='flex flex-col items-center justify-center text-center h-screen bg-black bg-opacity-60'> 
      <div className='flex flex-col justify-center text-white'>
        <h2 className='text-5xl font-bold m-2'>के तपाईं कृषिमा रुचि राख्नुहुन्छ?</h2>
        <p className='text-2xl m-2'>यदि तपाइँ इच्छुक हुनुहुन्छ भने</p>
      </div>
        <Link to='/courses' className='text-white bg-accent hover:bg-fourth shadow-lg w-56 p-2 rounded-xl text-center'>यो लिङ्क क्लिक गर्नुहोस्</Link>
      </div>
    </div>
    </>
  )
}
