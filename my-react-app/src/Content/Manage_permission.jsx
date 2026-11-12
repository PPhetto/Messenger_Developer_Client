import React, { useState, useEffect } from 'react';
import '../index.css'

import { PATHS } from '../path.js'

import { useNavigate } from 'react-router-dom'

function Manage_permission() {

    const navigate = useNavigate();

    const [addrole, setAddrole] = useState(false);
    // const [editpermission, setEditpermission] = useState(false);

    const [datarole, setDatarole] = useState([]);
    const [datauser, setDatauser] = useState([]);

    const [searchUser, setSearchUser] = useState('');

    const [role_name, setRoleName] = useState('');
    const [description, setDescription] = useState('');

    const filteredUsers = datauser.filter((user) => {
        const search = searchUser.toLowerCase().trim();

        return (
            user.firstname?.toLowerCase().includes(search) ||
            user.lastname?.toLowerCase().includes(search) ||
            `${user.firstname} ${user.lastname}`.toLowerCase().includes(search) ||
            user.email?.toLowerCase().includes(search)
        );
    });

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         try {
    //             const res = await fetch('http://localhost:5000/api/auth/users', {
    //                 method: 'GET',
    //             });

    //             if (res.ok) {
    //                 const data = await res.json();
    //                 await setDatauser(data.data);
    //                 fetchUsers();
    //                 // alert(data.message);
    //             } else {
    //                 alert(data.message);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching users:', error);
    //             alert('An error occurred while fetching users.');
    //         }
    //     };
    //     fetchUsers();
    // }, []);

    // useEffect(() => {
    //     const fetchRoles = async () => {
    //         try {
    //             const res = await fetch('http://localhost:5000/api/auth/roles', {
    //                 method: 'GET',
    //             });

    //             if (res.ok) {
    //                 const data = await res.json();
    //                 await setDatarole(data.data);
    //                 fetchRoles();
    //                 // alert(data.message);

    //             } else {
    //                 alert(data.message);

    //             }
    //         } catch (error) {
    //             console.error('Error fetching roles:', error);
    //             alert('An error occurred while fetching roles.');
    //         }
    //     };
    //     fetchRoles();
    // }, []);

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
                // alert(data.message);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error adding role:', error);
            alert('An error occurred while adding the role.');
        }
    }

    async function handleDeleteRole(id) {
        try {
            const res = await fetch(`http://localhost:5000/api/auth/roles/${id}`, 
                { 
                    method: 'DELETE',
                }
            )

            const data = await res.json();

            if (res.ok) {
                // alert(data.message);
            }else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error deleting role:', error);
            alert('An error occurred while deleting the role.');
        }
    }
                
  return (
    <div className="flex flex-row bg-white w-full h-full p-5 gap-5">
      {/* <h1>Manage_permission</h1> */}
      {/* <div className="flex flex-row w-full h-auto gap-5">

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
      </div> */}
      <div className="flex flex-col w-1/2 h-auto p-5 gap-5 bg-blue-200 rounded-[10px]">
        <div className="flex flex-row justify-between items-center w-full h-auto">
            <h1>Fetch Users</h1>
            <div className="flex flex-row gap-2 items-center justify-center">
                <input
                    type="text"
                    className="rounded-lg border-white border-2"
                    placeholder="Search Users"
                    value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                />
                <button
                        className="flex w-auto h-[30px] p-2 bg-blue-500 text-white justify-center items-center rounded-[10px] hover:bg-blue-700 transition-colors duration-200"
                        onClick={(e) => {
                                window.open(
                                    PATHS.REGISTER,
                                    "_blank",
                                    "width=800,height=1000"
                                )
                            // navigate(PATHS.REGISTER);
                        }}
                >
                    +
                </button>
            </div>
        </div>
        {/* {datauser.map((user, index) => (
            <div className="flex flex-col w-full h-auto bg-purple-200 rounded-[10px]">

            </div>
        ))} */}
        {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
                <div
                    key={user._id}
                    className="w-full bg-white border border-purple-100
                    rounded-xl shadow-sm hover:shadow-md transition-all
                    duration-300 overflow-hidden"
                >

                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-violet-500
                    px-5 py-4 flex items-center justify-between">

                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-white/20
                            flex items-center justify-center text-white">
                                <i className="fa-solid fa-user text-xl"></i>
                            </div>

                            <div>
                                <h3 className="text-white font-bold text-lg">
                                    {user.firstname} {user.lastname}
                                </h3>

                                <p className="text-purple-100 text-sm">
                                    {user.position || "No position"}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-5 items-center">
                            <span className="text-white/80 text-sm">
                                #{index + 1}
                            </span>

                            <button className="p-2 rounded-lg bg-purple-600 text-white">
                                Edit
                            </button>
                        </div>
                    </div>

                    {/* User Details */}
                    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div>
                            <p className="text-xs text-gray-400 font-medium">
                                EMAIL
                            </p>
                            <p className="text-sm text-gray-700">
                                {user.email || "-"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-400 font-medium">
                                PHONE
                            </p>
                            <p className="text-sm text-gray-700">
                                {user.phone || "-"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-400 font-medium">
                                POSITION
                            </p>
                            <p className="text-sm text-gray-700">
                                {user.position || "-"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-400 font-medium">
                                COMPANY
                            </p>
                            <p className="text-sm text-gray-700">
                                {user.company || "-"}
                            </p>
                        </div>

                    </div>
                </div>
            ))
        ) : (
            <div className="flex flex-col items-center justify-center p-10 bg-white rounded-xl">
                <i className="fa-solid fa-user-slash text-4xl text-gray-300 mb-3"></i>

                <p className="text-gray-500 font-semibold">
                    No users found
                </p>

                <p className="text-gray-400 text-sm">
                    Try searching with another name.
                </p>
            </div>
        )}
      </div>
      <div className="flex flex-col w-1/2 h-auto p-5 gap-5 bg-yellow-200 rounded-[10px]">
        <div className="flex flex-row justrify-between w-full h-auto rounded-[10px]">
            <h1>Permission</h1>
        </div>
        {/* {datarole.map((role, index) => (
            <div className="flex flex-col w-full h-auto bg-purple-200 rounded-[10px]">
                <div className="flex flex-row justify-between w-full h-[50%] p-5">
                    <p>{role.role_name}</p>
                </div>
                <div className="flex flex-row justify-between w-full h-[50%] p-5">
                    <p>{role.description}</p>
                    <div className="flex flex-row gap-2">
                        <button
                            className="flex w-auto h-auto p-2 bg-red-500 text-white justify-center items-center rounded-[10px] hover:bg-red-700 transition-colors duration-200"
                        >
                            Edit
                        </button>
                        <button
                            className="flex w-auto h-auto p-2 bg-red-500 text-white justify-center items-center rounded-[10px] hover:bg-red-700 transition-colors duration-200"
                            onClick={() => handleDeleteRole(role.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        ))} */}

        {datarole.map((role, index) => (
        <div
            key={role.id}
            className="w-full bg-white border border-purple-100
            rounded-xl shadow-sm hover:shadow-lg
            hover:border-purple-300 transition-all duration-300
            overflow-hidden"
        >
            {/* Header */}
            <div className="flex items-center justify-between
            p-5 bg-gradient-to-r from-purple-50 to-white">

            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-100
                flex items-center justify-center">
                <i className="fa-solid fa-shield-halved
                    text-purple-600 text-xl"></i>
                </div>

                <div>
                <h3 className="text-lg font-bold text-purple-900">
                    {role.role_name}
                </h3>
                <p className="text-xs text-purple-400 font-medium">
                    ROLE #{index + 1}
                </p>
                </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-green-100
                text-green-700 text-xs font-semibold">
                Active
            </span>
            </div>

            {/* Description */}
            <div className="px-5 py-4">
            <p className="text-xs font-semibold text-gray-400
                uppercase tracking-wider mb-2">
                Description
            </p>

            <p className="text-sm text-gray-600 leading-relaxed">
                {role.description || "No description available."}
            </p>
            </div>

            {/* Footer / Actions */}
            <div className="flex items-center justify-between
            px-5 py-4 border-t border-purple-100 bg-gray-50">

            <span className="text-xs text-gray-400">
                Role Management
            </span>

            <div className="flex items-center gap-2">

                {/* Edit */}
                <button
                className="flex items-center gap-2 px-4 py-2
                rounded-lg bg-purple-600 text-white text-sm
                font-medium hover:bg-purple-700
                active:scale-95 transition-all duration-200"
                >
                <i className="fa-solid fa-pen-to-square"></i>
                Edit
                </button>

                {/* Delete */}
                <button
                onClick={() => handleDeleteRole(role.id)}
                className="flex items-center gap-2 px-4 py-2
                rounded-lg bg-red-50 text-red-600 text-sm
                font-medium border border-red-200
                hover:bg-red-600 hover:text-white
                active:scale-95 transition-all duration-200"
                >
                <i className="fa-solid fa-trash"></i>
                Delete
                </button>

            </div>
            </div>
        </div>
        ))}

        {/* <div className="flex flex-col w-full h-auto bg-purple-200 rounded-[10px]">
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
        </div> */}
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
                        setAddrole(false);
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
