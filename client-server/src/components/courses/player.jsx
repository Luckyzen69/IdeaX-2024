import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Datas from './datas';
import Part from './part';

export default function Player() {
  const { id } = useParams();
  
  // Find the corresponding data from Datas
  const data = Datas.find((item) => item.id === id);

  

  // Check if the data and disease are found
  if (!data) {
    return <div>Data not found.</div>;
  }


  return (
    <>
      <div>
        <div className='flex flex-col items-center justify-center m-5 p-5'>
          <h1 className='text-2xl m-3'>{data.title}</h1>
          <p>{data.description}</p>
        </div>
        <Part/>
        <div>
          <Link to={`/courses/player/${id}/diseases`}>
            Diseases
          </Link>
        </div>
      
      </div>
    </>
  );
}
