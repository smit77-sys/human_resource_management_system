'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              🎯 Human Resource Management System
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            {user && (
              <>
                <Link href="/dashboard" className="hover:text-blue-600">
                  Dashboard
                </Link>
                <Link href="/attendance" className="hover:text-blue-600">
                  Attendance
                </Link>
                <Link href="/leave" className="hover:text-blue-600">
                  Leave
                </Link>
                <Link href="/payroll" className="hover:text-blue-600">
                  Payroll
                </Link>
                {(user.role === 'admin' || user.role === 'hr') && (
                  <Link href="/admin" className="hover:text-blue-600">
                    Admin Panel
                  </Link>
                )}
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm">{user.firstName} {user.lastName}</span>
                <button
                  onClick={handleLogout}
                  className="btn-primary"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn-secondary">
                  Login
                </Link>
                <Link href="/signup" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
