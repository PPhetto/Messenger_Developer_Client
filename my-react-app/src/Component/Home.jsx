import React, { useState } from 'react';
import '../index.css';

//path
import { PATHS } from '../path.js'

//npm install
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

//pic
import MSlogo from '../assets/64631.jpg'

function Home() {
  return (
    <div className='flex flex-col h-screen w-screen gap-10  bg-blue-400'>
      <div className='flex flex-row w-full h-auto justify-between bg-white p-5'>
        <div className='flex w-auto h-auto gap-6'>
          <button>☰</button>
          <div className='flex justify-center items-center w-[50px] h-[50px] bg-blue-500 text-white text-2xl rounded-[15px] font-black italic bg-gradient-to-br from-[#48a5ff] to-[#2860ef] shadow-[0_7px_16px_rgba(57,120,246,0.24)]'>
            M
          </div>
        </div>

      </div>
    </div>
  )
}

export default Home
