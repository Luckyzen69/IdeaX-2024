import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../appwrite/session';
import Pfp from '../../assets/user/userpfp.png';

export default function UserProfile() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    
    const closeDropdown = async () => {
        try {
            await logout(); 
            setDropdownOpen(false);
            navigate("/"); 
            window.location.reload(); 
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className="relative ">
            <div className='fixed top-0 z-50 right-2'>
                <img
                    src={Pfp}
                    alt="User Profile"
                    className="mt-2 w-10 bg-purewhite sm:h-16 rounded-full sm:w-16 object-cover object-center cursor-pointer"
                    onClick={toggleDropdown}
                />

                {dropdownOpen && (
                    <div
                        className="absolute mt-2 right-3 w-40 bg-white border rounded-lg shadow-lg"
                        onClick={(e) => e.stopPropagation()} // Prevent click from closing the dropdown
                    >
                        <ul className="text-gray-700">
                            <Link to='/user' onClick={() => setDropdownOpen(false)}>
                                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Profile</li>
                            </Link>
                            <Link to='/settings' onClick={() => setDropdownOpen(false)}>
                                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Settings</li>
                            </Link>
                            <div onClick={closeDropdown}>
                                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Logout</li>
                            </div>
                        </ul>
                    </div>
                )}

                {/* Close dropdown when clicking outside */}
                {dropdownOpen && (
                    <div
                        className="inset-0"
                        onClick={() => setDropdownOpen(false)}
                    />
                )}
            </div>
        </div>
    );
}
