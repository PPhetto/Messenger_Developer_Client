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
  MapPin,
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
  // const [addnew, setAddnew] = useState(false);
  const [results, setResults] = useState([]); // เริ่มว่าง รอกด Find

  const itemPerpage = 5;
  const [currentPage, setCurrentPage] = useState(1);   // ใต้ state results

  const totalPages = Math.max(1, Math.ceil(results.length / itemPerpage));   // ใต้ itemPerpage
  const startIndex = (currentPage - 1) * itemPerpage;
  const pagedResults = results.slice(startIndex, startIndex + itemPerpage);

  const mockOrders = [
    {
      id: 1,
      date: "2026-11-17",
      sender: "EMP001",
      senderName: "สมชาย ใจดี",
      messenger: "MSG001",
      messengerName: "กิตติ",
      location: "LOC001",
      locationName: "สำนักงานใหญ่",
      jobType: "งานส่งเอกสาร",
      zone: "Zone A",
      status: "รอดำเนินการ",
    },
    {
      id: 2,
      date: "2026-11-17",
      sender: "EMP002",
      senderName: "สมหญิง ใจงาม",
      messenger: "MSG002",
      messengerName: "ธนพล",
      location: "LOC002",
      locationName: "สาขา A",
      jobType: "งานรับเอกสาร",
      zone: "Zone B",
      status: "กำลังดำเนินการ",
    },
        {
      id: 3,
      date: "2026-11-16",
      sender: "EMP003",
      senderName: "ณัฐพล ดีมาก",
      messenger: "MSG003",
      messengerName: "วรพล",
      location: "LOC003",
      locationName: "สาขา B",
      jobType: "งานทั่วไป",
      zone: "Zone C",
      status: "เสร็จแล้ว",
    },
    {
      id: 4,
      date: "2026-11-16",
      sender: "EMP004",
      senderName: "กิตติพงษ์",
      messenger: "MSG001",
      messengerName: "กิตติ",
      location: "LOC001",
      locationName: "สำนักงานใหญ่",
      jobType: "งานส่งเอกสาร",
      zone: "Zone A",
      status: "เสร็จแล้ว",
    },
    {
      id: 5,
      date: "2026-11-15",
      sender: "EMP005",
      senderName: "ภาณุ",
      messenger: "MSG004",
      messengerName: "ศุภชัย",
      location: "LOC004",
      locationName: "สาขา C",
      jobType: "งานรับเอกสาร",
      zone: "Zone C",
      status: "รอดำเนินการ",
    },
    {
      id: 6,
      date: "2026-11-15",
      sender: "EMP006",
      senderName: "อนุชา",
      messenger: "MSG005",
      messengerName: "ชัยวัฒน์",
      location: "LOC002",
      locationName: "สาขา A",
      jobType: "งานทั่วไป",
      zone: "Zone B",
      status: "กำลังดำเนินการ",
    },
  ]


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({
      job: "", date: "", senderFrom: "", senderTo: "",
      messengerFrom: "", messengerTo: "", locationFrom: "", locationTo: "",
      jobType: "", zone: "",
    });
    setResults([]);
    setSearched(false);
    setCurrentPage(1); 
  };

  const inRange = (value, from, to) => {
    const v = value.toUpperCase();
    const f = from.trim().toUpperCase();
    const t = to.trim().toUpperCase();
    if (f && v < f) return false;
    if (t && v > t) return false;
    return true;
  };

const handleSearch = (e) => {
  e.preventDefault();
  const f = filters;

  const filtered = mockOrders.filter((o) => {
    if (f.job === "งานที่รอดำเนินการ" && o.status !== "รอดำเนินการ") return false;
    if (f.job === "งานที่เสร็จแล้ว" && o.status !== "เสร็จแล้ว") return false;
    if (f.date && o.date !== f.date) return false;
    if (!inRange(o.sender, f.senderFrom, f.senderTo)) return false;
    if (!inRange(o.messenger, f.messengerFrom, f.messengerTo)) return false;
    if (!inRange(o.location, f.locationFrom, f.locationTo)) return false;
    if (f.jobType && o.jobType !== f.jobType) return false;
    if (f.zone && o.zone !== f.zone) return false;
    return true;
  });

    setResults(filtered);
    setSearched(true);
    setCurrentPage(1);
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

            {/* <button
              type="button"
              onClick={resetFilters}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <RotateCcw size={15} />
              ล้างค่า
            </button> */}
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
                {pagedResults.map((o, index) => (
                  <tr key={o.id} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="px-5 py-3">{startIndex + index + 1}</td>
                    <td className="px-5 py-3">{o.date}</td>
                    <td className="px-5 py-3">
                      <div className="font-medium text-slate-700">{o.sender}</div>
                      <div className="text-xs text-slate-400">{o.senderName}</div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="font-medium text-slate-700">{o.messenger}</div>
                      <div className="text-xs text-slate-400">{o.messengerName}</div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="font-medium text-slate-700">{o.location}</div>
                      <div className="text-xs text-slate-400">{o.locationName}</div>
                    </td>
                    <td className="px-5 py-3">{o.jobType}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          o.status === "เสร็จแล้ว"
                            ? "bg-emerald-50 text-emerald-600"
                            : o.status === "กำลังดำเนินการ"
                            ? "bg-sky-50 text-sky-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-5 py-4">

              <p className="text-sm text-slate-500">
                แสดง {(currentPage - 1) * itemPerpage + 1}
                {" - "}
                {Math.min(currentPage * itemPerpage, results.length)}
                {" จาก "}
                {results.length} รายการ
              </p>

              <div className="flex items-center gap-1">

                {/* Previous */}
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ก่อนหน้า
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`h-9 w-9 rounded-lg text-sm font-medium transition ${
                      currentPage === page
                        ? "bg-sky-600 text-white"
                        : "border border-slate-200 text-slate-600 hover:bg-sky-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next */}
                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ถัดไป
                </button>

              </div>
            </div>
          )}

          {/* Empty State */}
          {results.length === 0 && (
            <div className="flex min-h-[280px] flex-col items-center justify-center px-5 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-slate-300">
                <PackageSearch size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-slate-600">
                {searched ? "ไม่พบข้อมูลที่ค้นหา" : "ยังไม่มีรายการสั่งงาน"}
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                {searched
                  // ? "ลองเปลี่ยนเงื่อนไขการค้นหาอีกครั้ง"
                  // : "รายการสั่งงานจะแสดงที่บริเวณนี้"}

                  ? `ผลการค้นหา ${results.length} รายการ` : "All Records"
                }
              </p>
            </div>
          )}
        </section>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-slate-400">
          <span>Order Management System</span>
          <span>© 2026 All Rights Reserved</span>
        </div>

      </main>



      {/* Add New Modal */}
      {showAddForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
          onClick={() => setShowAddForm(false)}
        >
          <div
            className="flex max-h-[90vh] w-full max-w-4xl flex-col rounded-xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
              <div>
                <h2 className="text-base font-semibold text-slate-800">
                  เพิ่มรายการสั่งงาน
                </h2>
                <p className="text-xs text-slate-400">
                  Add New Order
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
              >
                <X size={19} />
              </button>
            </div>

            {/* Form */}
            <form
              className="flex-1 space-y-5 overflow-y-auto p-5"
              onSubmit={(e) => {
                e.preventDefault();
                setShowAddForm(false);
              }}
            >
              {/* Basic Information */}
              <section>
                <h3 className="mb-3 border-b border-slate-100 pb-2 text-sm font-semibold text-slate-700">
                  ข้อมูลการสั่งงาน
                </h3>

                <div className="grid grid-cols-1 gap-x-5 gap-y-3 md:grid-cols-2">

                  {/* Job No */}
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">
                      เลขที่ใบสั่งงาน
                    </label>
                    <input
                      type="text"
                      placeholder="Auto Generate"
                      className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-sky-400"
                    />
                  </div>

                  {/* Requester */}
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">
                      ผู้สั่งงาน
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="รหัส"
                        className="w-24 rounded-md border border-slate-200 px-2 py-2 text-sm outline-none focus:border-sky-400"
                      />
                      <input
                        type="text"
                        placeholder="ชื่อ - นามสกุล"
                        className="min-w-0 flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400"
                      />
                    </div>
                  </div>

                  {/* Job Date */}
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">
                      งานวันที่ / เวลา
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        className="min-w-0 flex-1 rounded-md border border-slate-200 px-2 py-2 text-sm outline-none focus:border-sky-400"
                      />
                      <input
                        type="time"
                        className="w-28 rounded-md border border-slate-200 px-2 py-2 text-sm outline-none focus:border-sky-400"
                      />
                    </div>
                  </div>

                  {/* Document Date */}
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">
                      วัน / เวลารับเอกสาร
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="date"
                        className="min-w-0 flex-1 rounded-md border border-slate-200 px-2 py-2 text-sm outline-none focus:border-sky-400"
                      />
                      <span className="text-xs text-slate-400">ถึง</span>
                      <input
                        type="time"
                        className="w-28 rounded-md border border-slate-200 px-2 py-2 text-sm outline-none focus:border-sky-400"
                      />
                    </div>
                  </div>

                  {/* Job Type */}
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-xs text-slate-500">
                      ประเภทงาน
                    </label>

                    <div className="flex flex-wrap items-center gap-4">
                      <label className="flex items-center gap-1.5 text-sm text-slate-700">
                        <input type="radio" name="jobType" value="send" className="accent-sky-600" />
                        ส่งเอกสาร
                      </label>

                      <label className="flex items-center gap-1.5 text-sm text-slate-700">
                        <input type="radio" name="jobType" value="receive" className="accent-sky-600" />
                        รับเอกสาร
                      </label>

                      <select className="min-w-0 flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400">
                        <option value="">เลือกประเภท</option>
                      </select>

                      <select className="min-w-0 flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400">
                        <option value="">เลือกรายละเอียดประเภท</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="mb-1 block text-xs text-slate-500">
                      รายละเอียดงาน
                    </label>
                    <textarea
                      rows={2}
                      placeholder="รายละเอียดงาน..."
                      className="w-full resize-none rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400"
                    />
                  </div>
                </div>
              </section>

              {/* Location & Payment */}
              <section>
                <h3 className="mb-3 border-b border-slate-100 pb-2 text-sm font-semibold text-slate-700">
                  สถานที่และการชำระเงิน
                </h3>

                <div className="grid grid-cols-1 gap-x-5 gap-y-3 md:grid-cols-2">

                  {/* Cheque */}
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">
                      Cheque No
                    </label>
                    <input
                      type="text"
                      placeholder="Cheque No"
                      className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400"
                    />
                  </div>

                  {/* Amount / Bank */}
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">
                      Amount / Bank
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Amount"
                        className="w-1/2 rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400"
                      />
                      <select className="min-w-0 flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400">
                        <option value="">Bank</option>
                      </select>
                    </div>
                  </div>

                  {/* Location Code */}
                  <div className="md:col-span-2">
                    <label className="mb-1 block text-xs text-slate-500">
                      รหัส - ชื่อสถานที่
                    </label>

                    <div className="flex flex-wrap gap-2">
                      <input
                        type="text"
                        placeholder="รหัส"
                        className="w-28 rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400"
                      />

                      <button
                        type="button"
                        className="rounded-md bg-sky-500 px-3 text-white hover:bg-sky-600"
                      >
                        <Search size={16} />
                      </button>

                      <input
                        type="text"
                        placeholder="ชื่อสถานที่"
                        className="min-w-0 flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400"
                      />

                      <button type="button" className="text-xs font-medium text-sky-600 hover:underline">
                        Select Address
                      </button>

                      <button type="button" className="text-xs font-medium text-sky-600 hover:underline">
                        Remember Address
                      </button>
                    </div>
                  </div>

                  {/* Contact */}
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">
                      ติดต่อ
                    </label>
                    <input
                      type="text"
                      placeholder="ชื่อผู้ติดต่อ"
                      className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">
                      โทร
                    </label>
                    <input
                      type="tel"
                      placeholder="เบอร์โทรศัพท์"
                      className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400"
                    />
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <label className="mb-1 block text-xs text-slate-500">
                      ที่อยู่
                    </label>
                    <textarea
                      rows={2}
                      placeholder="รายละเอียดที่อยู่"
                      className="w-full resize-none rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400"
                    />
                  </div>

                  {/* Zone */}
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">
                      โซน
                    </label>
                    <select className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400">
                      <option value="">เลือกโซน</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Reference & Messenger */}
              <section>
                <h3 className="mb-3 border-b border-slate-100 pb-2 text-sm font-semibold text-slate-700">
                  ข้อมูลอ้างอิงและผู้ดำเนินงาน
                </h3>

                <div className="grid grid-cols-1 gap-x-5 gap-y-3 md:grid-cols-2">

                  {/* Ref Job */}
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">
                      Ref. Job
                    </label>
                    <input
                      type="text"
                      placeholder="Reference Job"
                      className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400"
                    />
                  </div>

                  {/* Create By */}
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">
                      Create By
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        disabled
                        className="min-w-0 flex-1 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                      />
                      <input
                        type="date"
                        disabled
                        className="w-36 rounded-md border border-slate-200 bg-slate-50 px-2 py-2 text-sm"
                      />
                    </div>
                  </div>

                  {/* Ref AWB */}
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">
                      Ref. AWB
                    </label>
                    <input
                      type="text"
                      placeholder="Reference AWB"
                      className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400"
                    />
                  </div>

                  {/* Edit By */}
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">
                      Edit By
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        disabled
                        className="min-w-0 flex-1 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                      />
                      <input
                        type="date"
                        disabled
                        className="w-36 rounded-md border border-slate-200 bg-slate-50 px-2 py-2 text-sm"
                      />
                    </div>
                  </div>

                  {/* Messenger */}
                  <div className="md:col-span-2">
                    <label className="mb-1 block text-xs text-slate-500">
                      Messenger
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="รหัส"
                        className="w-28 rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400"
                      />
                      <button
                        type="button"
                        className="rounded-md bg-sky-500 px-3 text-white hover:bg-sky-600"
                      >
                        <Search size={16} />
                      </button>
                      <input
                        type="text"
                        placeholder="ชื่อ Messenger"
                        className="min-w-0 flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400"
                      />
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="mb-1 block text-xs text-slate-500">
                      Status
                    </label>
                    <select className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400">
                      <option value="">เลือกสถานะ</option>
                      <option>รอดำเนินการ</option>
                      <option>กำลังดำเนินการ</option>
                      <option>เสร็จสิ้น</option>
                      <option>ยกเลิก</option>
                    </select>
                  </div>

                  {/* Cancel */}
                  <div className="flex items-end pb-2">
                    <label className="flex items-center gap-2 text-sm text-slate-600">
                      <input
                        type="checkbox"
                        name="cancel"
                        className="accent-red-500"
                      />
                      Cancel
                    </label>
                  </div>

                  {/* Remark */}
                  <div className="md:col-span-2">
                    <label className="mb-1 block text-xs text-slate-500">
                      หมายเหตุ
                    </label>
                    <textarea
                      rows={2}
                      placeholder="หมายเหตุเพิ่มเติม..."
                      className="w-full resize-none rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400"
                    />
                  </div>

                </div>
              </section>

            </form>

            {/* Footer */}
            <div className="flex justify-end gap-2 border-t border-slate-100 px-5 py-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
              >
                ยกเลิก
              </button>

              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
              >
                <Plus size={16} />
                บันทึกรายการ
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}

export default Orders
