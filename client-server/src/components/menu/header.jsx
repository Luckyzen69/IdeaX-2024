import React from 'react'
import Logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom'
export default function Header() {
  return (
    <>
    <div className='flex justify-between items-center m-2 mr-20 fixed top-2 left-10 z-50'>
        <Link to='/' className='flex items-center cursor-pointer'>
            <img src={Logo} alt="" />
            <h6 className='text-xl'>Agro-Sikshya</h6> 
        </Link>

        <ul className='flex flex-col sm:flex-row sm:space-x-10 capitalize cursor-pointer fixed right-10'>
            <Link to='/login'><li className='m-3 hover:text-accent'>login </li></Link>
            <Link to='/signup'><li className='border rounded-md m-1  px-4 py-2 bg-accent hover:bg-fourth text-white'>register </li></Link>
        </ul>
    </div>
    </>
  )
}
