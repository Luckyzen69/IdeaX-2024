import React from 'react'
import Logo from '../../assets/logo.svg'
export default function Header() {
  return (
    <>
    <div>
        <div>
            <img src={Logo} alt="" />
            <h6>Agro-Sikshya</h6>
        </div>

        <ul>
            <li>home</li>
            <li>course  </li>
            <li>login </li>
            <li>register </li>
        </ul>
    </div>
    </>
  )
}
