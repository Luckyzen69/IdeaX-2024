import React from 'react'
import Logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom'
export default function Header() {
  return (
    <>
    <div className='flex justify-between items-center m-2 mr-20 '>
        <div className='flex items-center'>
            <img src={Logo} alt="" />
            <h6 className='text-xl'>Agro-Sikshya</h6> 
        </div>

        <ul className='flex space-x-10 capitalize cursor-pointer'>
            <Link to='/'><li className='m-3 hover:text-accent'>home</li></Link>
            <Link to='/course'><li className='m-3 hover:text-accent'>course  </li></Link>
            <Link to='/'><li className='m-3 hover:text-accent'>login </li></Link>
            <Link to='/'><li className='border rounded-md m-1  px-4 py-2 bg-accent hover:bg-fourth text-white'>register </li></Link>
        </ul>
    </div>
    </>
  )
}
