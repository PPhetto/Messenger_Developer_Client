import React from 'react'
import '../index.css'

function Manage_permission() {
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
            <div className="flex flex-row w-full h-[50%] p-5">
                <p>Administrator</p>
            </div>
        </div>
        <button className="flex w-auto h-auto p-5 bg-blue-500 text-white justify-center items-center rounded-[10px] hover:bg-blue-700 transition-colors duration-200">
            Add Roles
        </button>
      </div>
    </div>
  )
}

export default Manage_permission
