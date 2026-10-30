import React, { useState } from 'react';
import '../index.css';

//path
import { PATHS } from '../path.js'

//npm install
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

//pic
import MSlogo from '../assets/64631.jpg'

//content_page
import overview_p from '../Content/Overview.jsx'
import homecontent_p from '../Content/HomeContent.jsx'
import orders_p from '../Content/Orders.jsx'
import task_management_p from '../Content/TaskManagement.jsx';
import work_records_p from '../Content/WorkRecords.jsx'
import reports_p from '../Content/Reports.jsx'
import database_p from '../Content/Database.jsx'
import Overview from '../Content/Overview.jsx';


function Home() {
  const navigate = useNavigate();

  const [activemenu, setActivemenu] = useState("Overview")
  const [sidebar, setSidebar] = useState(true)

  const menus = [
    { id: "Overview", label: "หน้าภาพรวม" },
    { id: "Home", label: "หน้าหลัก" },
    { id: "Orders", label: "สั่งงาน" },
    { id: "TaskManagement", label: "จัดการงาน" },
    { id: "WorkRecords", label: "บันทึกผลการทำงาน" },
    { id: "Reports", label: "รายงาน" },
    { id: "Database", label: "ฐานข้อมูล" },
  ]

  const contentComponents = {
    Overview: overview_p,
    Home: homecontent_p,
    Orders: orders_p,
    TaskManagement: task_management_p,
    WorkRecords: work_records_p,
    Reports: reports_p,
    Database: database_p,
  }

  const ActiveContent = contentComponents[activemenu] || Overview

  return (
    <div className='flex flex-col h-screen w-screen bg-blue-400 gap-0.5'>
      <div className='flex flex-row w-full h-auto justify-between bg-white p-5 items-center'>
        <div className='flex w-auto h-auto gap-6'>
          {/* <button
            onClick={(e) => {
              e.preventDefault();
              console.log("Open Menu");
            setSidebar(!sidebar);
            }}
          >
            ☰
          </button> */}
          <div className='flex justify-center items-center w-[50px] h-[50px] bg-blue-500 text-white text-2xl rounded-[15px] font-black italic bg-gradient-to-br from-[#48a5ff] to-[#2860ef] shadow-[0_7px_16px_rgba(57,120,246,0.24)]'>
            M
          </div>
          <div className='flex flex-col w-auto h-auto'>
            <p>
              MESSENGER <span>SYSTEM</span>
            </p>
            <p>
              Delivery Management
            </p>
          </div>
        </div>
        <div className='flex w-auto h-auto gap-6'>
          <div className='flex flex-col items-end'>
            <p>
              Administrator <span>/ Tanachot Ketsomboon</span>
            </p>
            <button
              className='w-auto h-[40px] p-2 text-red-500 underline decoration-red-500 hover:text-red-700 hover:decoration-red-700 transition-colors duration-200'
              onClick={() => {
                navigate(PATHS.LOGIN)
              }}
            >
              Signout
            </button>
          </div>

          <div className='flex justify-center items-center w-[50px] h-[50px] bg-blue-500 text-[#245ed6] text-2xl rounded-[15px] font-black italic bg-[linear-gradient(135deg,#d8e8ff,#b5d1ff)] shadow-[0_7px_16px_rgba(57,120,246,0.24)]'>
            A
          </div>
        </div>
      </div>
      <div className='flex flex-row w-full h-full bg-red-500'>
        {sidebar && (
          <div className='flex flex-col bg-white w-[300px] h-full'>
            <div className='text-black text-[10px] font-extrabold tracking-[1.5px] px-[13px] mt-2 mb-3'>
              MAIN MENU
            </div>
            {menus.map((menu) => (
              <button
                key={menu.id}
                onClick={() => setActivemenu(menu.id)}
                  className={`w-full flex items-center gap-3 border-0 px-[13px] py-3 rounded-xl text-left text-[13px] my-1 transition-all duration-200 
                  ${
                    activemenu === menu.id
                      ? "bg-[linear-gradient(100deg,#eaf2ff,#f2f7ff)] text-[var(--blue-dark)] font-[750] shadow-[inset_3px_0_0_var(--blue)]"
                      : "bg-transparent text-[#74819b] hover:bg-[#f5f8ff] hover:text-[var(--blue)]"
                  }`}
              >
                {menu.label}
              </button>
            ))}
          </div>
        )}
        <div className='flex w-full h-full bg-red-400 p-5'>
          {/* <div className='flex bg-white w-[50px] h-[50px]'>

          </div> */}
          <ActiveContent />
        </div>
      </div>
    </div>
  )
}

export default Home
