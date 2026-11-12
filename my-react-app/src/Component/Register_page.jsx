import React, { useState } from 'react'
import '../index.css'

//path
import { PATHS } from '../path.js'

//npm install
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

//pic
import MSlogo from '../assets/64631.jpg'

function Register_page() {

    const navigate = useNavigate();

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [position, setPosition] = useState('')
    const [company, setCompany] = useState('')

    //array
    const companylist = [
        { id: 1, name: 'EXCEL - เอ็กเซล ทรานสปอร์ต อินเตอร์เนชั่นแนล จำกัด' },
        { id: 2, name: 'TCF - บริษัท เดอะ คาร์โก้ไฟล้ท์ส จำกัด' },
        { id: 3, name: 'EMO - บริษัท อีโม ทรานส์ (ไทยแลนด์) จำกัด' },
        { id: 4, name: 'Winston - บริษัท วินสตัน คาร์โก้ แอนด์ โลจิสติกส์ จำกัด' }
        // { id: 5, name: 'Company E' },
    ]

        async function handleRegister() {
            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            if (password === '') {
                alert("Password fields cannot be empty!");
                return;
            }

            try {
                const res = await fetch('http://localhost:5000/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        firstname,
                        lastname,
                        username, 
                        password,
                        email,
                        phone,
                        position,
                        company
                    }),
                })
    
                const data = await res.json();
    
                if (res.ok) {
                    alert(data.message);
                    // navigate(PATHS.LOGIN);
                    window.close();
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error('Error during registration:', error);
                alert('An error occurred while registering.');
            }
        }




  return (
    <div className='flex flex-col h-screen w-screen justify-center items-center gap-10  bg-blue-400'>
        <div className='flex flex-col bg-white w-[700px] h-auto items-center rounded-3xl shadow-[0_25px_60px_rgba(15,45,100,0.25)] animate-[fadeIn_0.7s_ease] p-10'>
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
                className="flex flex-col items-center w-[700px] h-auto"
                // onSubmit={(e) => {
                //     e.preventDefault();
                //     console.log("Register clicked!");
                // }}
            >
                <div className='flex flex-row justify-between w-[80%] h-[50px]'>
                    <input
                        className='w-[48%] h-[50px] rounded-lg p-2 border border-blue-400'
                        type="text"
                        placeholder="✍️ Firstname"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />

                    <input
                        className='w-[48%] h-[50px] rounded-lg p-2 border border-blue-400'
                        type="text"
                        placeholder="✍️ Lastname"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                </div>

                {/* <div className='flex flex-row justify-between w-[300px] h-[50px] mt-16 mb-18'>
                    <input
                        className='w-[140px] h-[50px] rounded-lg p-2 border border-blue-400'
                        type="text"
                        placeholder="✍️ Firstname"
                    />

                    <input
                        className='w-[140px] h-[50px] rounded-lg p-2 border border-blue-400 mt-8'
                        type="text"
                        placeholder="✍️ Lastname"
                    />
                </div> */}


                <input
                    className='w-[80%] h-[50px] rounded-lg p-2 border border-blue-400 mt-8'
                    type="text"
                    placeholder="👤 Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    className='w-[80%] h-[50px] rounded-lg p-2 border border-blue-400 mt-8'
                    type="password"
                    placeholder="🔒 Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    className='w-[80%] h-[50px] rounded-lg p-2 border border-blue-400 mt-8'
                    type="password"
                    placeholder="🔒 Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <div className='flex flex-row justify-between w-[80%] h-[50px] mt-8'>
                    <input
                        className='w-[48%] h-[50px] rounded-lg p-2 border border-blue-400'
                        type="email"
                        placeholder="✉️ Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        className='w-[48%] h-[50px] rounded-lg p-2 border border-blue-400'
                        type="tel"
                        placeholder="📱 Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                {/* <input
                    className='w-[300px] h-[50px] rounded-lg p-2 border border-blue-400 mt-8'
                    type="email"
                    placeholder="✉️ Email"
                />

                <input
                    className='w-[300px] h-[50px] rounded-lg p-2 border border-blue-400 mt-8'
                    type="tel"
                    placeholder="📱 Phone"
                /> */}

                <div className='flex flex-row justify-between w-[80%] h-[50px] mt-8'>
                    <input
                        className='w-[48%] h-[50px] rounded-lg p-2 border border-blue-400'
                        type="email"
                        placeholder="💼 Position"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                    />
                    <select
                        className="w-[48%] h-[50px] rounded-lg p-2 border border-blue-400"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        required
                        >
                        <option value="" disabled>
                            🏢 Select Company
                        </option>

                        {companylist.map((item) => (
                            <option key={item.id} value={item.name}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* <input
                    className='w-[300px] h-[50px] rounded-lg p-2 border border-blue-400 mt-8'
                    type="email"
                    placeholder="💼 Position"
                />

                <input
                    className='w-[300px] h-[50px] rounded-lg p-2 border border-blue-400 mt-8'
                    type="email"
                    placeholder="🏢 Company"
                /> */}

                <div className='flex flex-row justify-between w-[80%] h-auto mt-16 mb-13'>
                    <button
                        type="submit"
                        className='w-[48%] h-[60px] rounded-lg p-2 border border-blue-500 bg-blue-500 text-white hover:bg-blue-400 hover:border-blue-400'
                            onClick={(e) => {
                            e.preventDefault();
                            console.log("Register clicked!");
                            handleRegister();
                        }}
                    >
                        Add
                    </button>
                    <button
                        type="cancel"
                        className='w-[48%] h-[60px] rounded-lg p-2 border border-red-500 bg-red-500 text-white hover:bg-red-400 hover:border-red-400'
                        onClick={(e) => {
                            // e.preventDefault();
                            // navigate(PATHS.LOGIN);
                            window.close();
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}
export default Register_page
