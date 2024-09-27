import React from 'react'
import { CiSearch } from "react-icons/ci";
import Createpost from './createpost';
import emailjs from 'emailjs-com';
import { useState } from 'react';
import Expert from './expert';
import Faq from './faq';
export default function Community() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    problem: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();


    emailjs.send(
      'service_vke3tog',    
      'template_7l8lmuj',   
      formData,             
      'NSzYLrEbvDfYpRAoh'        
    )
    .then((result) => {
      console.log('Email sent successfully:', result.text);
      alert('Your problem request has been sent!');
    }, (error) => {
      console.error('Error sending email:', error.text);
      alert('Failed to send the request. Please try again.');
    });
  };


  return (
    <>
      <div className='mt-8 '>

        <div className='flex justify-between'>
          <h6 className='font-bold text-xl ml-3 mt-5'>विज्ञहरू सँग सल्लाह</h6>
          <div className='flex px-6 space-x-2'>
            <div className=' justify-center items-center  hidden'>
              <input type="search" name="" id="" className='border bg-secondary rounded-xl p-1  ' placeholder='Search topics..' />
              <button>  <CiSearch className='border text-3xl rounded-sm p-1 bg-secondary' /></button>
            </div>
          </div>
        </div>
        <div className='flex justify-center m-2 '>
          <Expert formData={formData} setFormData={setFormData} handleSubmit={handleSubmit}/>
        </div>
          <Faq/>
      </div>
    </>
  )
}
