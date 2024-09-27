import React from 'react'
import { useParams } from 'react-router-dom'
import Datas from './datas'
export default function Player() {
    const {id}= useParams();
    const data = Datas.find((item) => item.id === id)
  return (
    <>
    <div>
        <div className='flex flex-col items-center justify-center m-5 p-5'>
            <h1 className='text-2xl m-3'>{data.title}</h1>
            <iframe src={data.url} frameborder="0" className='w-[800px] h-[400px]'></iframe>
            <p>{data.description}</p>
        </div>
    </div>
    </>
  )
}
