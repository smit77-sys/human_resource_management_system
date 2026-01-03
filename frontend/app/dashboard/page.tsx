'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import ProfileCard from '@/components/ProfileCard';
import AttendanceCard from '@/components/AttendanceCard';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileCard />
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <a href="/attendance" className="block btn btn-primary text-center">
                View Attendance
              </a>
              <a href="/leave" className="block btn btn-primary text-center">
                Apply for Leave
              </a>
              <a href="/payroll" className="block btn btn-primary text-center">
                View Payroll
              </a>
            </div>
          </div>
        </div>

        <AttendanceCard />
      </div>
    </ProtectedRoute>
  );
}
