'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold mb-4">🎯 Human Resource Management System (HRMS)</h1>
      <p className="text-xl text-gray-600 mb-8">
        Human Resource Management System
      </p>
      <p className="text-lg text-gray-500 mb-12">
        Every workday, perfectly aligned.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="card">
          <h2 className="text-2xl font-bold mb-4">📊 Dashboard</h2>
          <p className="text-gray-600">
            View your attendance, leave status, and payroll information.
          </p>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4">⏰ Attendance</h2>
          <p className="text-gray-600">
            Check-in/check-out and view your attendance records.
          </p>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4">📅 Leave Management</h2>
          <p className="text-gray-600">
            Apply for leave and track your leave balance.
          </p>
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <Link href="/login" className="btn-primary">
          Login
        </Link>
        <Link href="/signup" className="btn-secondary">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
