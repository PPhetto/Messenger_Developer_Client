import React, { useState } from 'react';
import '../index.css';

//path
import { PATHS } from '../path.js'

//npm install
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

//pic
import MSlogo from '../assets/64631.jpg'

function Login_page() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // async function handleLogin() {
    //     try {
    //         const res = await fetch('http://localhost:5000/api/auth/login', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ 
    //                 username, 
    //                 password 
    //             }),
    //         })

    //         const data = await res.json();

    //         if (res.ok) {
    //             await localStorage.setItem('token', data.token);
    //             alert(data.message);
    //             navigate(PATHS.HOME);
    //         } else {
    //             alert(data.message);
    //         }
    //     } catch (error) {
    //         console.error('Error during login:', error);
    //         alert('An error occurred while logging in.');
    //     }
    // }


  return (
    <div className='flex flex-col h-screen w-screen justify-center items-center gap-10  bg-blue-400'>
        <div className='flex flex-col bg-white w-[500px] h-[700px] items-center rounded-3xl shadow-[0_25px_60px_rgba(15,45,100,0.25)] animate-[fadeIn_0.7s_ease]'>
            <div className='flex w-[300px] h-[300px] rounded-lg p-2'>
                <img src={MSlogo} alt="Logo" className='w-full h-full object-contain' />
            </div>
            {/* <input 
                className='w-[300px] h-[50px] rounded-lg p-2 border-1 border-blue-400'
                type="text" 
                placeholder="👤 Username" 
            />
            <input 
                className='w-[300px] h-[50px] rounded-lg p-2 border-1 border-blue-400 mt-8'
                type="password" 
                placeholder="🔒 Password" 
            />
            <button 
                className='w-[300px] h-[50px] rounded-lg p-2 mt-12 border-1 border-blue-500 bg-blue-500 text-white hover:bg-blue-400 hover:border-blue-400'
            >
                Login
            </button> */}
            <form
                className="flex flex-col items-center"
                // onSubmit={(e) => {
                //     e.preventDefault();
                //     console.log("Login clicked!");
                // }}
            >
                <input
                    className='w-[300px] h-[50px] rounded-lg p-2 border border-blue-400'
                    type="text"
                    placeholder="👤 Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    className='w-[300px] h-[50px] rounded-lg p-2 border border-blue-400 mt-8'
                    type="password"
                    placeholder="🔒 Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                    className='w-[300px] h-[50px] rounded-lg p-2 mt-12 border border-blue-500 bg-blue-500 text-white hover:bg-blue-400 hover:border-blue-400'
                    onClick={(e) => {
                        e.preventDefault();
                        console.log("Login clicked!");
                        // handleLogin();
                        navigate(PATHS.HOME);
                    }}
                >
                    Login
                </button>
            </form>
            <Link 
                to="#" 
                className="text-blue-500 mt-13 hover:underline"
            >
                Forgot password?
            </Link>
            {/* <Link
                to={PATHS.REGISTER}
            >   
                Don't have an account? <span className='text-blue-500 hover:underline'>Sign up</span>
            </Link> */}
        </div>
    </div>
  )
}
export default Login_page
