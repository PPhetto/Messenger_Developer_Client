import React, { useState, useEffect } from 'react';
import '../index.css'

import { PATHS } from '../path.js'

import { useNavigate } from 'react-router-dom'

import {
  ShieldCheck,
  Search,
  Home,
  Send,
  ListChecks,
  ClipboardCheck,
  ChartColumn,
  Database,
  Check,
  X,
  Save,
  Users,
} from "lucide-react";

function Users_permission() {

    const [selectedUser, setSelectedUser] = useState(1);
    const [search, setSearch] = useState("");

    const users = [
        { id: 1, name: "Somchai Jaidee", position: "IT Support", department: "Information Technology", avatar: "SJ", status: "active" },
        { id: 2, name: "Nattapong D.", position: "IT Support", department: "Information Technology", avatar: "ND", status: "active" },
        { id: 3, name: "Prapassorn K.", position: "HR Officer", department: "HR Department", avatar: "PP", status: "active" },
        { id: 4, name: "Manas Kamol", position: "Accountant", department: "Finance", avatar: "MK", status: "inactive" },
        { id: 5, name: "Thitipong W.", position: "Marketing", department: "Marketing", avatar: "TW", status: "active" },
        { id: 6, name: "Pitchaya K.", position: "Sales", department: "Sales", avatar: "PK", status: "active" },
    ];

    const menus = [
        { id: "overview", name: "หน้าภาพรวม", icon: Home },
        { id: "order", name: "สั่งงาน", icon: Send },
        { id: "manage", name: "จัดการงาน", icon: ListChecks },
        { id: "result", name: "บันทึกผลการทำงาน", icon: ClipboardCheck },
        { id: "report", name: "รายงาน", icon: ChartColumn },
        { id: "database", name: "ฐานข้อมูล", icon: Database },
        { id: "permission", name: "จัดการสิทธิ์", icon: ShieldCheck },
    ];

    const permissionTypes = [
        { id: "view", label: "ดู (View)" },
        { id: "create", label: "เพิ่ม (Create)" },
        { id: "edit", label: "แก้ไข (Edit)" },
        { id: "delete", label: "ลบ (Delete)" },
    ];

    const [permissions, setPermissions] = useState({
        1: Object.fromEntries(
        menus.map((menu) => [
            menu.id,
            { view: true, create: true, edit: true, delete: false },
        ])
        ),
    });

    const currentPermissions = permissions[selectedUser] || {};

    const filteredUsers = users.filter((user) =>
        `${user.name} ${user.department}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    const togglePermission = (menuId, type) => {
        setPermissions((prev) => ({
        ...prev,
        [selectedUser]: {
            ...(prev[selectedUser] || {}),
            [menuId]: {
            view: false,
            create: false,
            edit: false,
            delete: false,
            ...(prev[selectedUser]?.[menuId] || {}),
            [type]: !prev[selectedUser]?.[menuId]?.[type],
            },
        },
        }));
    };

    const selectAll = () => {
        setPermissions((prev) => ({
        ...prev,
        [selectedUser]: Object.fromEntries(
            menus.map((menu) => [
            menu.id,
            { view: true, create: true, edit: true, delete: true },
            ])
        ),
        }));
    };

    const clearAll = () => {
        setPermissions((prev) => ({
        ...prev,
        [selectedUser]: Object.fromEntries(
            menus.map((menu) => [
            menu.id,
            { view: false, create: false, edit: false, delete: false },
            ])
        ),
        }));
    };

    const handleSave = () => {
        console.log("User:", selectedUser);
        console.log("Permissions:", currentPermissions);
        alert("บันทึกการตั้งค่าสิทธิ์เรียบร้อย");
    };

    const activeUser = users.find((user) => user.id === selectedUser);
    return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-700">

      {/* Header */}
      <header className="relative overflow-hidden border-b border-sky-100 bg-gradient-to-r from-white via-sky-50 to-blue-100 px-6 py-5">
        <div className="absolute -right-10 -top-24 h-64 w-64 rounded-full border-[30px] border-sky-200/30" />
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[20px] border-blue-300/20" />

        <div className="relative flex items-center justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2 text-sm font-medium text-sky-600">
              <ShieldCheck size={17} />
              PERMISSION MANAGEMENT
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-800">
              จัดการสิทธิ์การใช้งาน
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              กำหนดสิทธิ์การเข้าถึงเมนูและฟังก์ชันต่าง ๆ สำหรับผู้ใช้งานแต่ละคน
            </p>
          </div>

          <span className="hidden text-2xl font-black tracking-widest text-sky-400 sm:block">
            SYSTEM
          </span>
        </div>
      </header>

      <main className="space-y-5 p-5 md:p-6">

        {/* Main Content */}
        <section className="grid grid-cols-1 gap-5 xl:grid-cols-12">

          {/* User List */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm xl:col-span-3">

            <div className="border-b border-slate-100 p-5">
              <h2 className="flex items-center gap-2 font-bold text-slate-800">
                <Users size={19} className="text-sky-600" />
                รายชื่อผู้ใช้งาน
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                เลือกผู้ใช้งานเพื่อกำหนดสิทธิ์
              </p>

              <div className="relative mt-4">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="ค้นหาชื่อผู้ใช้..."
                  className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                />
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredUsers.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => setSelectedUser(user.id)}
                  className={`flex w-full items-center gap-3 p-4 text-left transition ${
                    selectedUser === user.id
                      ? "border-l-4 border-sky-500 bg-sky-50"
                      : "border-l-4 border-transparent hover:bg-slate-50"
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-sm font-bold text-white">
                    {user.avatar}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {user.name}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-slate-400">
                      {user.position}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-medium ${
                      user.status === "active"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {user.status === "active" ? "ใช้งานอยู่" : "ระงับใช้งาน"}
                  </span>
                </button>
              ))}

              {filteredUsers.length === 0 && (
                <p className="p-6 text-center text-sm text-slate-400">
                  ไม่พบรายชื่อผู้ใช้งาน
                </p>
              )}
            </div>

            <div className="border-t border-slate-100 px-5 py-3">
              <p className="text-xs text-slate-400">
                ทั้งหมด {filteredUsers.length} จาก {users.length} รายการ
              </p>
            </div>
          </div>

          {/* Permission Panel */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm xl:col-span-9">

            {/* User Profile */}
            <div className="flex flex-wrap items-center gap-4 border-b border-slate-100 p-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-xl font-bold text-white shadow-sm">
                {activeUser.avatar}
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  {activeUser.name}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {activeUser.position} · {activeUser.department}
                </p>
                <span className="mt-2 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                  {activeUser.status === "active" ? "ใช้งานอยู่" : "ระงับใช้งาน"}
                </span>
              </div>
            </div>

            {/* Permission Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/70 px-5 py-4">
              <h2 className="flex items-center gap-2 font-bold text-slate-800">
                <ShieldCheck size={19} className="text-sky-600" />
                กำหนดสิทธิ์การใช้งาน
              </h2>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={selectAll}
                  className="flex items-center gap-1.5 rounded-lg border border-sky-200 bg-white px-3 py-2 text-xs font-medium text-sky-600 transition hover:bg-sky-50"
                >
                  <Check size={14} />
                  เลือกทั้งหมด
                </button>

                <button
                  type="button"
                  onClick={clearAll}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-500 transition hover:bg-slate-100"
                >
                  <X size={14} />
                  ยกเลิกทั้งหมด
                </button>
              </div>
            </div>

            {/* Permission Table */}
            <div className="overflow-x-auto p-5">
              <table className="w-full min-w-[700px] text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-xs text-slate-400">
                    <th className="px-4 py-4 text-left font-semibold">
                      เมนู
                    </th>

                    {permissionTypes.map((type) => (
                      <th
                        key={type.id}
                        className="px-3 py-4 text-center font-semibold"
                      >
                        {type.label}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {menus.map((menu) => {
                    const Icon = menu.icon;
                    const menuPermission = currentPermissions[menu.id] || {};

                    return (
                      <tr
                        key={menu.id}
                        className="transition hover:bg-sky-50/40"
                      >
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                              <Icon size={19} />
                            </div>

                            <span className="font-semibold text-slate-700">
                              {menu.name}
                            </span>
                          </div>
                        </td>

                        {permissionTypes.map((type) => (
                          <td
                            key={type.id}
                            className="px-3 py-4 text-center"
                          >
                            <input
                              type="checkbox"
                              checked={!!menuPermission[type.id]}
                              onChange={() =>
                                togglePermission(menu.id, type.id)
                              }
                              className="h-4 w-4 cursor-pointer accent-sky-600"
                            />
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-100 bg-slate-50 px-5 py-4">
              <button
                type="button"
                onClick={() => setPermissions((prev) => ({
                  ...prev,
                  [selectedUser]: {},
                }))}
                className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
              >
                ยกเลิก
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-2 rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-sky-700"
              >
                <Save size={17} />
                บันทึกการตั้งค่า
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex flex-wrap justify-between gap-2 px-1 text-xs text-slate-400">
          <span>Order Management System</span>
          <span>© 2026 All Rights Reserved</span>
        </footer>
      </main>
    </div>
  );
}

export default Users_permission
