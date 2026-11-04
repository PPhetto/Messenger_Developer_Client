import React, { useState, useEffect } from 'react';
import '../index.css'

function Manage_permission() {

    const [addrole, setAddrole] = useState(false);

    const [role_name, setRoleName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/auth/roles', {
                    method: 'GET',
                });

                if (res.ok) {
                    const data = await res.json();
                    alert(data.message);

                } else {
                    alert(data.message);

                }
            } catch (error) {
                console.error('Error fetching roles:', error);
                alert('An error occurred while fetching roles.');
            }
        };

        fetchRoles();
    }, []);

    async function handleAddRole() {
        try {
            const res = await fetch('http://localhost:5000/api/auth/new-role', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    role_name,
                    description
                }),
            })

            const data = await res.json();

            if (res.ok) {
                alert(data.message);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error adding role:', error);
            alert('An error occurred while adding the role.');
        }
    }

  return (
    <div className="flex flex-col bg-white w-full h-full p-5 gap-5">
      <h1>Manage_permission</h1>
      <div className="flex flex-row w-full h-auto gap-5">
        <div className="flex flex-col justify-between w-1/6 h-[300px] bg-blue-200 p-5 rounded-[10px]">
            <p>
                TEST
            </p>
            <p>
                Roles
            </p>
        </div>
        <div className="flex flex-col justify-between w-1/6 h-[300px] bg-green-200 p-5 rounded-[10px]">
            <p>
                TEST
            </p>
            <p>
                Roles
            </p>
        </div>
      </div>
      <div className="flex flex-col w-1/2 h-auto p-5 gap-5 bg-yellow-200 rounded-[10px]">
        <h1>Permission</h1>
        <div className="flex flex-col w-full h-auto bg-purple-200 rounded-[10px]">
            <div className="flex flex-row justify-between w-full h-[50%] p-5">
                <p>TEST</p>
            </div>
            <div className="flex flex-row w-full h-[50%] p-5">
                <p>Administrator</p>
            </div>
        </div>
        <div className="flex flex-col w-full h-auto bg-purple-200 rounded-[10px]">
            <div className="flex flex-row justify-between w-full h-[50%] p-5">
                <p>TEST</p>
            </div>
            <div className="flex flex-row justify-between w-full h-[50%] p-5">
                <p>Administrator</p>
                <button
                    className="flex w-auto h-auto p-2 bg-red-500 text-white justify-center items-center rounded-[10px] hover:bg-red-700 transition-colors duration-200"
                >
                    Edit
                </button>
            </div>
        </div>
        <button 
            className="flex w-auto h-auto p-5 bg-blue-500 text-white justify-center items-center rounded-[10px] hover:bg-blue-700 transition-colors duration-200"
            onClick={() => setAddrole(!addrole)}
        >
            Add Roles
        </button>
        {addrole && (
            <div className="flex flex-col w-full h-auto p-5 gap-5 bg-yellow-200 rounded-[10px]">
                <h2>Add New Role</h2>
                <input
                    type="text"
                    placeholder="Role Name"
                    className="p-3 rounded-lg border-white border-2"
                    value={role_name}
                    onChange={(e) => setRoleName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    className="p-3 rounded-lg border-white border-2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button
                    className="flex w-auto h-auto p-2 bg-green-500 text-white justify-center items-center rounded-[10px] hover:bg-green-700 transition-colors duration-200"
                    onClick={(e) => {
                        handleAddRole();
                    }}
                >
                    Save
                </button>
            </div>
        )}
      </div>
    </div>
  )
}

export default Manage_permission
