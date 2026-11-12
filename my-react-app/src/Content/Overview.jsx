import React, { useState, useEffect } from 'react';
import '../index.css'

import { PATHS } from '../path.js'

import { useNavigate } from 'react-router-dom'

import {
  ClipboardList,
  CheckCircle2,
  Clock3,
  ChartNoAxesCombined,
  TrendingUp,
  TrendingDown,
  CalendarDays,
  ChevronDown,
  ArrowUpRight,
  ArrowRight,
  CircleUserRound,
  Activity,
  PackageCheck,
  Timer,
  FileText,
  MapPin,
  X,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function Overview() {

  const [selectedYear, setSelectedYear] = useState("2026");
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showAllActivities, setShowAllActivities] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  

  // Mock User
  const user = {
    name: "Somchai Jaidee",
    position: "IT Support",
    department: "Information Technology",
    avatar: "SJ",
  };

  // Mock Statistics
  const stats = [
    {
      title: "งานที่สั่งทั้งหมด",
      value: "128",
      unit: "รายการ",
      change: "+12.5%",
      positive: true,
      description: "เทียบกับเดือนก่อน",
      icon: ClipboardList,
      color: "blue",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "งานที่เสร็จแล้ว",
      value: "96",
      unit: "รายการ",
      change: "+8.2%",
      positive: true,
      description: "เทียบกับเดือนก่อน",
      icon: CheckCircle2,
      color: "emerald",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "งานที่กำลังดำเนินการ",
      value: "24",
      unit: "รายการ",
      change: "6 รายการ",
      positive: false,
      description: "รอดำเนินการ",
      icon: Clock3,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      title: "อัตราการจบงาน",
      value: "75",
      unit: "%",
      change: "+5.4%",
      positive: true,
      description: "เทียบกับเดือนก่อน",
      icon: ChartNoAxesCombined,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
    },
  ];

  // Mock Monthly Chart Data
  const monthlyData = {
    "2026": [
      { month: "ม.ค.", orders: 12, completed: 9 },
      { month: "ก.พ.", orders: 18, completed: 15 },
      { month: "มี.ค.", orders: 15, completed: 12 },
      { month: "เม.ย.", orders: 22, completed: 18 },
      { month: "พ.ค.", orders: 16, completed: 13 },
      { month: "มิ.ย.", orders: 25, completed: 20 },
      { month: "ก.ค.", orders: 20, completed: 16 },
      { month: "ส.ค.", orders: 28, completed: 22 },
      { month: "ก.ย.", orders: 18, completed: 14 },
      { month: "ต.ค.", orders: 24, completed: 19 },
      { month: "พ.ย.", orders: 20, completed: 16 },
      { month: "ธ.ค.", orders: 0, completed: 0 },
    ],
    "2025": [
      { month: "ม.ค.", orders: 10, completed: 8 },
      { month: "ก.พ.", orders: 15, completed: 12 },
      { month: "มี.ค.", orders: 18, completed: 14 },
      { month: "เม.ย.", orders: 14, completed: 11 },
      { month: "พ.ค.", orders: 21, completed: 17 },
      { month: "มิ.ย.", orders: 19, completed: 15 },
      { month: "ก.ค.", orders: 25, completed: 20 },
      { month: "ส.ค.", orders: 16, completed: 13 },
      { month: "ก.ย.", orders: 22, completed: 18 },
      { month: "ต.ค.", orders: 20, completed: 16 },
      { month: "พ.ย.", orders: 17, completed: 14 },
      { month: "ธ.ค.", orders: 23, completed: 19 },
    ],
  };

  // Mock Recent Activities
  const activities = [
    {
      id: "ORD-001",
      title: "ส่งเอกสารฝ่ายบัญชี",
      date: "12 พ.ย. 2026",
      status: "completed",
      statusText: "เสร็จสิ้น",
      requester: "Somchai Jaidee",
      messenger: "John Smith",
      from: "แผนก IT",
      to: "แผนกบัญชี",
      jobType: "ส่งเอกสาร",
      zone: "Zone A",
      description: "นำเอกสารใบแจ้งหนี้ไปส่งให้ฝ่ายบัญชี",
      completedAt: "12 พ.ย. 2026 14:30 น.",
    },
    {
      id: "ORD-002",
      title: "รับเอกสารฝ่ายบุคคล",
      date: "12 พ.ย. 2026",
      status: "pending",
      statusText: "กำลังดำเนินการ",
      requester: "Somchai Jaidee",
      messenger: "David",
      from: "แผนกบุคคล",
      to: "แผนก IT",
      jobType: "รับเอกสาร",
      zone: "Zone B",
      description: "รับเอกสารจากฝ่ายบุคคลเพื่อนำมาส่งให้ IT",
      completedAt: "-",
    },
    {
      id: "ORD-003",
      title: "ส่งอุปกรณ์คอมพิวเตอร์",
      date: "11 พ.ย. 2026",
      status: "completed",
      statusText: "เสร็จสิ้น",
      requester: "Somchai Jaidee",
      messenger: "Michael",
      from: "แผนก IT",
      to: "แผนกการตลาด",
      jobType: "ส่งอุปกรณ์",
      zone: "Zone C",
      description: "นำเมาส์และคีย์บอร์ดไปส่งให้พนักงานฝ่ายการตลาด",
      completedAt: "11 พ.ย. 2026 16:00 น.",
    },
    {
      id: "ORD-004",
      title: "รับพัสดุจากแผนกจัดซื้อ",
      date: "10 พ.ย. 2026",
      status: "pending",
      statusText: "กำลังดำเนินการ",
      requester: "Somchai Jaidee",
      messenger: "David",
      from: "แผนกจัดซื้อ",
      to: "แผนก IT",
      jobType: "รับพัสดุ",
      zone: "Zone A",
      description: "รับพัสดุอุปกรณ์สำนักงานจากแผนกจัดซื้อ",
      completedAt: "-",
    },
    {
      id: "ORD-005",
      title: "ส่งเอกสารฝ่ายการเงิน",
      date: "09 พ.ย. 2026",
      status: "completed",
      statusText: "เสร็จสิ้น",
      requester: "Somchai Jaidee",
      messenger: "John Smith",
      from: "แผนก IT",
      to: "แผนกการเงิน",
      jobType: "ส่งเอกสาร",
      zone: "Zone B",
      description: "นำเอกสารค่าใช้จ่ายประจำเดือนไปส่งฝ่ายการเงิน",
      completedAt: "09 พ.ย. 2026 11:30 น.",
    },
    {
      id: "ORD-006",
      title: "รับเอกสารจากฝ่ายบริหาร",
      date: "08 พ.ย. 2026",
      status: "cancelled",
      statusText: "ยกเลิก",
      requester: "Somchai Jaidee",
      messenger: "Michael",
      from: "แผนกบริหาร",
      to: "แผนก IT",
      jobType: "รับเอกสาร",
      zone: "Zone C",
      description: "รับเอกสารจากฝ่ายบริหาร แต่มีการยกเลิกรายการ",
      completedAt: "-",
    },
  ];

  const chartData = monthlyData[selectedYear];

  const totalPages = Math.ceil(activities.length / itemsPerPage);

  const paginatedActivities = activities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const completedRate = Math.round((96 / 128) * 100);

  const statusStyle = {
    completed: "bg-emerald-50 text-emerald-700",
    pending: "bg-amber-50 text-amber-700",
    cancelled: "bg-red-50 text-red-600",
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-700">

      {/* Header */}
      <header className="relative overflow-hidden border-b border-sky-100 bg-gradient-to-r from-white via-sky-50 to-blue-100 px-6 py-5">

        <div className="absolute -right-10 -top-24 h-64 w-64 rounded-full border-[30px] border-sky-200/30" />
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[20px] border-blue-300/20" />

        <div className="relative mx-auto flex max-w-[1600px] items-center justify-between">

          <div>
            <div className="mb-1 flex items-center gap-2 text-sm font-medium text-sky-600">
              <Activity size={17} />
              USER OVERVIEW
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-800">
              ภาพรวมการสั่งงาน
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              ภาพรวมสถิติงานของคุณ
            </p>
          </div>

          <span className="hidden text-2xl font-black tracking-widest text-sky-400 sm:block">
            SYSTEM
          </span>

        </div>
      </header>

      <main className="mx-auto max-w-[1600px] space-y-6 p-5 md:p-6">

        {/* User Profile */}
        <section className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-lg font-bold text-white shadow-sm">
              {user.avatar}
            </div>

            <div>
              <p className="text-xs font-medium text-slate-400">
                ยินดีต้อนรับ
              </p>

              <h2 className="text-lg font-bold text-slate-800">
                {user.name}
              </h2>

              <p className="text-sm text-slate-500">
                {user.position} · {user.department}
              </p>
            </div>

          </div>

          <div className="flex items-center gap-2 rounded-lg bg-sky-50 px-4 py-3 text-sm text-sky-700">
            <CalendarDays size={17} />
            <span>12 พฤศจิกายน 2026</span>
          </div>

        </section>

        {/* Statistics Cards */}
        <section>

          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-800">
                สถิติการสั่งงาน
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                สรุปข้อมูลการทำงานของคุณทั้งหมด
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {stats.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >

                  <div className="flex items-start justify-between">

                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        {item.title}
                      </p>

                      <div className="mt-3 flex items-baseline gap-1">
                        <span className="text-3xl font-bold tracking-tight text-slate-800">
                          {item.value}
                        </span>
                        <span className="text-sm text-slate-400">
                          {item.unit}
                        </span>
                      </div>
                    </div>

                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.iconBg} ${item.iconColor}`}>
                      <Icon size={22} />
                    </div>

                  </div>

                  <div className="mt-4 flex items-center gap-1.5 text-xs">
                    {item.positive ? (
                      <TrendingUp size={14} className="text-emerald-500" />
                    ) : (
                      <Clock3 size={14} className="text-amber-500" />
                    )}

                    <span className={item.positive ? "font-semibold text-emerald-600" : "font-semibold text-amber-600"}>
                      {item.change}
                    </span>

                    <span className="text-slate-400">
                      {item.description}
                    </span>
                  </div>

                </div>
              );
            })}

          </div>
        </section>

        {/* Charts */}
        <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">

          {/* Monthly Bar Chart */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">

            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">

              <div>
                <h2 className="font-bold text-slate-800">
                  ภาพรวมการสั่งงานรายเดือน
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  เปรียบเทียบจำนวนงานที่สั่งและงานที่เสร็จแล้ว
                </p>
              </div>

              <div className="relative">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="h-9 appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-9 text-sm text-slate-600 outline-none focus:border-sky-400"
                >
                  <option value="2026">ปี 2026</option>
                  <option value="2025">ปี 2025</option>
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-3 text-slate-400"
                />
              </div>

            </div>

            <div className="h-[300px] w-full">

              <ResponsiveContainer width="100%" height="100%">

                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
                  barGap={6}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E2E8F0"
                  />

                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94A3B8", fontSize: 12 }}
                    dy={10}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94A3B8", fontSize: 12 }}
                    allowDecimals={false}
                  />

                  <Tooltip
                    cursor={{ fill: "#F1F5F9" }}
                    contentStyle={{
                      borderRadius: "10px",
                      border: "1px solid #E2E8F0",
                      fontSize: "12px",
                    }}
                  />

                  <Legend
                    verticalAlign="top"
                    align="right"
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{
                      fontSize: "12px",
                      paddingBottom: "20px",
                    }}
                  />

                  <Bar
                    dataKey="orders"
                    name="งานที่สั่ง"
                    fill="#38BDF8"
                    radius={[5, 5, 0, 0]}
                    maxBarSize={28}
                  />

                  <Bar
                    dataKey="completed"
                    name="งานที่เสร็จ"
                    fill="#10B981"
                    radius={[5, 5, 0, 0]}
                    maxBarSize={28}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* Completion Rate */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

            <h2 className="font-bold text-slate-800">
              อัตราความสำเร็จ
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              สัดส่วนงานที่ดำเนินการเสร็จแล้ว
            </p>

            <div className="flex flex-col items-center py-8">

              <div
                className="relative flex h-44 w-44 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(#10B981 ${completedRate}%, #F1F5F9 0)`,
                }}
              >

                <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-white">

                  <span className="text-4xl font-bold text-slate-800">
                    {completedRate}%
                  </span>

                  <span className="mt-1 text-xs text-slate-400">
                    Completed
                  </span>

                </div>

              </div>

            </div>

            <div className="space-y-4">

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  งานที่เสร็จแล้ว
                </div>
                <span className="font-semibold text-slate-700">
                  96 งาน
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                  งานที่เหลือ
                </div>
                <span className="font-semibold text-slate-700">
                  32 งาน
                </span>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    งานทั้งหมด
                  </span>
                  <span className="font-bold text-slate-800">
                    128 งาน
                  </span>
                </div>
              </div>

            </div>

          </div>

        </section>

        {/* Recent Activities */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">

            <div>
              <h2 className="font-bold text-slate-800">
                ประวัติการสั่งงานล่าสุด
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                รายการสั่งงานที่คุณดำเนินการล่าสุด
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAllActivities(true)}
              className="flex items-center gap-1 text-sm font-medium text-sky-600 transition hover:text-sky-700"
            >
              ดูทั้งหมด
              <ArrowRight size={16} />
            </button>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[650px] text-left text-sm">

              <thead className="bg-slate-50 text-xs font-semibold text-slate-500">
                <tr>
                  <th className="px-5 py-3">รหัสงาน</th>
                  <th className="px-5 py-3">รายละเอียดงาน</th>
                  <th className="px-5 py-3">วันที่สั่งงาน</th>
                  <th className="px-5 py-3">สถานะ</th>
                  <th className="px-5 py-3 text-center">รายละเอียด</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">

                {paginatedActivities.map((item) => (

                  <tr
                    key={item.id}
                    className="transition hover:bg-slate-50"
                  >

                    <td className="px-5 py-4 font-medium text-sky-600">
                      {item.id}
                    </td>

                    <td className="px-5 py-4 font-medium text-slate-700">
                      {item.title}
                    </td>

                    <td className="px-5 py-4 text-slate-500">
                      {item.date}
                    </td>

                    <td className="px-5 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyle[item.status]}`}>
                        {item.statusText}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-center">
                      <button
                        type="button"
                        onClick={() => setSelectedActivity(item)}
                        className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 transition hover:bg-sky-50 hover:text-sky-600"
                        title="ดูรายละเอียด"
                      >
                        <ArrowUpRight size={17} />
                      </button>
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
                แสดง {(currentPage - 1) * itemsPerPage + 1}
                {" - "}
                {Math.min(currentPage * itemsPerPage, activities.length)}
                {" จาก "}
                {activities.length} รายการ
              </p>

              <div className="flex items-center gap-1">

                {/* Previous */}
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ก่อนหน้า
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
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
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ถัดไป
                </button>

              </div>
            </div>
          )}

        </section>

        {/* Footer */}
        <footer className="flex flex-wrap justify-between gap-2 px-1 text-xs text-slate-400">
          <span>Order Management System</span>
          <span>© 2026 All Rights Reserved</span>
        </footer>

      </main>

    {/* All Activities Modal */}
    {showAllActivities && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
        onClick={() => setShowAllActivities(false)}
      >
        <div
          className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                รายการงานทั้งหมด
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                ประวัติการสั่งงานทั้งหมดของคุณ
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAllActivities(false)}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={20} />
            </button>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-3 gap-3 border-b border-slate-100 bg-slate-50 p-5">
            <div className="rounded-lg bg-white p-3">
              <p className="text-xs text-slate-400">งานทั้งหมด</p>
              <p className="mt-1 text-xl font-bold text-slate-800">
                {activities.length}
              </p>
            </div>

            <div className="rounded-lg bg-white p-3">
              <p className="text-xs text-slate-400">เสร็จสิ้น</p>
              <p className="mt-1 text-xl font-bold text-emerald-600">
                {activities.filter(item => item.status === "completed").length}
              </p>
            </div>

            <div className="rounded-lg bg-white p-3">
              <p className="text-xs text-slate-400">กำลังดำเนินการ</p>
              <p className="mt-1 text-xl font-bold text-amber-600">
                {activities.filter(item => item.status === "pending").length}
              </p>
            </div>
          </div>

          {/* Activities Table */}
          <div className="flex-1 overflow-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="sticky top-0 bg-slate-50 text-xs font-semibold text-slate-500">
                <tr>
                  <th className="px-5 py-4">รหัสงาน</th>
                  <th className="px-5 py-4">รายละเอียดงาน</th>
                  <th className="px-5 py-4">วันที่สั่งงาน</th>
                  <th className="px-5 py-4">สถานะ</th>
                  <th className="px-5 py-4 text-center">รายละเอียด</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {activities.map((item) => (
                  <tr
                    key={item.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4 font-medium text-sky-600">
                      {item.id}
                    </td>

                    <td className="px-5 py-4 font-medium text-slate-700">
                      {item.title}
                    </td>

                    <td className="px-5 py-4 text-slate-500">
                      {item.date}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyle[item.status]}`}
                      >
                        {item.statusText}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setShowAllActivities(false);
                          setSelectedActivity(item);
                        }}
                        className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 transition hover:bg-sky-50 hover:text-sky-600"
                        title="ดูรายละเอียด"
                      >
                        <ArrowUpRight size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {activities.length === 0 && (
              <div className="py-12 text-center text-sm text-slate-400">
                ยังไม่มีรายการงาน
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end border-t border-slate-100 bg-slate-50 px-6 py-4">
            <button
              type="button"
              onClick={() => setShowAllActivities(false)}
              className="rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              ปิดหน้าต่าง
            </button>
          </div>
        </div>
      </div>
    )}

      {/* Detail Modal */}
      {selectedActivity && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
          onClick={() => setSelectedActivity(null)}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-sky-50 to-white px-6 py-5">

              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-sky-600">
                  <ClipboardList size={17} />
                  รายละเอียดการสั่งงาน
                </div>

                <h2 className="mt-1 text-xl font-bold text-slate-800">
                  {selectedActivity.id}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedActivity(null)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>

            </div>

            {/* Modal Body */}
            <div className="max-h-[70vh] space-y-5 overflow-y-auto p-6">

              {/* Status */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">

                <div>
                  <p className="text-xs text-slate-400">
                    สถานะการดำเนินงาน
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {selectedActivity.statusText}
                  </p>
                </div>

                <span
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
                    statusStyle[selectedActivity.status]
                  }`}
                >
                  {selectedActivity.statusText}
                </span>

              </div>

              {/* Basic Information */}
              <div>
                <h3 className="mb-3 flex items-center gap-2 font-semibold text-slate-800">
                  <FileText size={17} className="text-sky-600" />
                  ข้อมูลการสั่งงาน
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  <div>
                    <p className="text-xs text-slate-400">ชื่อรายการงาน</p>
                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {selectedActivity.title}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">วันที่สั่งงาน</p>
                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {selectedActivity.date}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">ผู้สั่งงาน</p>
                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {selectedActivity.requester}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">Messenger</p>
                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {selectedActivity.messenger}
                    </p>
                  </div>

                </div>
              </div>

              <div className="border-t border-slate-100" />

              {/* Location Information */}
              <div>
                <h3 className="mb-3 flex items-center gap-2 font-semibold text-slate-800">
                  <MapPin size={17} className="text-sky-600" />
                  ข้อมูลสถานที่
                </h3>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-xs text-slate-400">
                      สถานที่ต้นทาง
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {selectedActivity.from}
                    </p>
                  </div>

                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-xs text-slate-400">
                      สถานที่ปลายทาง
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {selectedActivity.to}
                    </p>
                  </div>

                </div>
              </div>

              <div className="border-t border-slate-100" />

              {/* Job Information */}
              <div>
                <h3 className="mb-3 font-semibold text-slate-800">
                  ข้อมูลเพิ่มเติม
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  <div>
                    <p className="text-xs text-slate-400">
                      ประเภทงาน
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {selectedActivity.jobType}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      โซน
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {selectedActivity.zone}
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <p className="text-xs text-slate-400">
                      รายละเอียดงาน
                    </p>
                    <div className="mt-2 rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm leading-relaxed text-slate-600">
                      {selectedActivity.description}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      วันที่เสร็จงาน
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {selectedActivity.completedAt}
                    </p>
                  </div>

                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t border-slate-100 bg-slate-50 px-6 py-4">

              <button
                type="button"
                onClick={() => setSelectedActivity(null)}
                className="rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                ปิดหน้าต่าง
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default Overview
