import React, { useState, useEffect } from 'react';
import '../index.css'

import { PATHS } from '../path.js'

import { useNavigate } from 'react-router-dom'

import {
  Search,
  Plus,
  Printer,
  RotateCcw,
  ClipboardList,
  Filter,
  CalendarDays,
  ChevronDown,
  FolderSearch,
  FileText,
  PackageSearch,
  X,
} from "lucide-react";

function Orders() {
  
const [filters, setFilters] = useState({
    job: "",
    date: "",
    senderFrom: "",
    senderTo: "",
    messengerFrom: "",
    messengerTo: "",
    locationFrom: "",
    locationTo: "",
    jobType: "",
    zone: "",
  });

  const [searched, setSearched] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({
      job: "",
      date: "",
      senderFrom: "",
      senderTo: "",
      messengerFrom: "",
      messengerTo: "",
      locationFrom: "",
      locationTo: "",
      jobType: "",
      zone: "",
    });
    setSearched(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearched(true);
    // TODO: เรียก API สำหรับค้นหาข้อมูล
  };

  const InputField = ({
    label,
    name,
    value,
    onChange,
    placeholder = "ระบุข้อมูล",
    type = "text",
  }) => (
    <div className="flex flex-col gap-1.5 min-w-0">
      <label className="text-sm font-medium text-slate-600">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-300 focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
      />
    </div>
  );

  const SelectField = ({ label, name, value, onChange, options = [] }) => (
    <div className="flex flex-col gap-1.5 min-w-0">
      <label className="text-sm font-medium text-slate-600">
        {label}
      </label>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-9 text-sm text-slate-700 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
        >
          <option value="">ทั้งหมด</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-3 text-slate-400"
        />
      </div>
    </div>
  );


  return (
<div className="min-h-screen bg-slate-50 text-slate-700">

      {/* Header */}
      <header className="relative overflow-hidden border-b border-sky-100 bg-gradient-to-r from-white via-sky-50 to-blue-100 px-6 py-5">
        <div className="pointer-events-none absolute -right-10 -top-24 h-64 w-64 rounded-full border-[30px] border-sky-200/30" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border-[20px] border-blue-300/20" />

        <div className="relative mx-auto flex max-w-[1600px] items-center justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2 text-sm font-medium text-sky-600">
              <ClipboardList size={17} />
              ระบบจัดการงาน
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">
              การสั่งงาน
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              ค้นหา ตรวจสอบ และจัดการรายการสั่งงาน
            </p>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <span className="text-2xl font-black tracking-widest text-sky-400">
              SYSTEM
            </span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-[1600px] space-y-5 p-5 md:p-6">

        {/* Search Filter */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                <Search size={19} />
              </div>
              <div>
                <h2 className="font-semibold text-slate-800">
                  ค้นหารายการสั่งงาน
                </h2>
                <p className="text-xs text-slate-400">
                  กำหนดเงื่อนไขเพื่อค้นหาข้อมูล
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <RotateCcw size={15} />
              ล้างค่า
            </button>
          </div>

          <form onSubmit={handleSearch} className="p-5">

            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">

              <SelectField
                label="เลือกดูงาน"
                name="job"
                value={filters.job}
                onChange={handleChange}
                options={["งานทั้งหมด", "งานที่รอดำเนินการ", "งานที่เสร็จแล้ว"]}
              />

              <InputField
                label="ประจำวันที่"
                name="date"
                value={filters.date}
                onChange={handleChange}
                type="date"
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-600">
                  รหัสผู้สั่งงาน
                </label>
                <div className="flex items-center gap-2">
                  <input
                    name="senderFrom"
                    value={filters.senderFrom}
                    onChange={handleChange}
                    placeholder="จาก"
                    className="h-10 w-full min-w-0 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                  />
                  <span className="text-xs text-slate-400">ถึง</span>
                  <input
                    name="senderTo"
                    value={filters.senderTo}
                    onChange={handleChange}
                    placeholder="ถึง"
                    className="h-10 w-full min-w-0 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-600">
                  Messenger
                </label>
                <div className="flex items-center gap-2">
                  <input
                    name="messengerFrom"
                    value={filters.messengerFrom}
                    onChange={handleChange}
                    placeholder="จาก"
                    className="h-10 w-full min-w-0 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                  />
                  <span className="text-xs text-slate-400">ถึง</span>
                  <input
                    name="messengerTo"
                    value={filters.messengerTo}
                    onChange={handleChange}
                    placeholder="ถึง"
                    className="h-10 w-full min-w-0 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-600">
                  รหัสสถานที่ติดต่อ
                </label>
                <div className="flex items-center gap-2">
                  <input
                    name="locationFrom"
                    value={filters.locationFrom}
                    onChange={handleChange}
                    placeholder="จาก"
                    className="h-10 w-full min-w-0 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                  />
                  <span className="text-xs text-slate-400">ถึง</span>
                  <input
                    name="locationTo"
                    value={filters.locationTo}
                    onChange={handleChange}
                    placeholder="ถึง"
                    className="h-10 w-full min-w-0 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                  />
                </div>
              </div>

              <SelectField
                label="ประเภทงาน"
                name="jobType"
                value={filters.jobType}
                onChange={handleChange}
                options={["งานรับเอกสาร", "งานส่งเอกสาร", "งานทั่วไป"]}
              />

              <SelectField
                label="โซน"
                name="zone"
                value={filters.zone}
                onChange={handleChange}
                options={["Zone A", "Zone B", "Zone C"]}
              />

            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap items-center justify-end gap-2 border-t border-slate-100 pt-4">

              <button
                type="button"
                onClick={resetFilters}
                className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                <RotateCcw size={16} />
                Reset
              </button>

              <button
                type="submit"
                className="flex h-10 items-center gap-2 rounded-lg bg-sky-600 px-5 text-sm font-medium text-white shadow-sm transition hover:bg-sky-700 active:scale-[0.98]"
              >
                <Search size={17} />
                Find
              </button>

              <button
                type="button"
                onClick={() => setShowAddForm(true)}
                className="flex h-10 items-center gap-2 rounded-lg bg-emerald-600 px-5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.98]"
              >
                <Plus size={18} />
                Add New
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                <Printer size={17} />
                Print
              </button>

            </div>
          </form>
        </section>

        {/* Results */}
        <section className="min-h-[380px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500">
                <FileText size={19} />
              </div>
              <div>
                <h2 className="font-semibold text-slate-800">
                  รายการสั่งงาน
                </h2>
                <p className="text-xs text-slate-400">
                  ข้อมูลรายการสั่งงานทั้งหมด
                </p>
              </div>
            </div>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
              {searched ? "ผลการค้นหา" : "All Records"}
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold text-slate-500">
                <tr>
                  <th className="px-5 py-3">ลำดับ</th>
                  <th className="px-5 py-3">วันที่</th>
                  <th className="px-5 py-3">รหัสผู้สั่งงาน</th>
                  <th className="px-5 py-3">Messenger</th>
                  <th className="px-5 py-3">สถานที่ติดต่อ</th>
                  <th className="px-5 py-3">ประเภทงาน</th>
                  <th className="px-5 py-3">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {/* นำข้อมูลจาก API มาแสดงตรงนี้ */}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          <div className="flex min-h-[280px] flex-col items-center justify-center px-5 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-slate-300">
              <PackageSearch size={32} strokeWidth={1.5} />
            </div>
            <h3 className="font-semibold text-slate-600">
              {searched ? "ไม่พบข้อมูลที่ค้นหา" : "ยังไม่มีรายการสั่งงาน"}
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              {searched
                ? "ลองเปลี่ยนเงื่อนไขการค้นหาอีกครั้ง"
                : "รายการสั่งงานจะแสดงที่บริเวณนี้"}
            </p>
          </div>

        </section>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-slate-400">
          <span>Order Management System</span>
          <span>© 2026 All Rights Reserved</span>
        </div>

      </main>

      {/* Add New Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <h2 className="font-semibold text-slate-800">
                เพิ่มรายการสั่งงาน
              </h2>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={19} />
              </button>
            </div>
            <div className="p-5">
              <p className="text-sm text-slate-500">
                พื้นที่สำหรับสร้างรายการสั่งงานใหม่ สามารถเพิ่มฟอร์มรายละเอียด
                และเชื่อมต่อ API ได้ที่ส่วนนี้
              </p>
            </div>
            <div className="flex justify-end gap-2 border-t border-slate-100 p-4">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Orders
