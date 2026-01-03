'use client';

import { useEffect, useState } from 'react';
import { attendanceAPI } from '@/lib/api-endpoints';

interface AttendanceRecord {
  _id: string;
  date: string;
  checkInTime?: string;
  checkOutTime?: string;
  status: 'present' | 'absent' | 'half-day' | 'leave';
}

export default function AttendanceCard() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0];

        const response: any = await attendanceAPI.getMyAttendance(startDate, endDate);
        setRecords(response.data);
      } catch (error) {
        console.error('Failed to fetch attendance', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  const handleCheckIn = async () => {
    try {
      await attendanceAPI.checkIn();
      // Refresh data
      window.location.reload();
    } catch (error) {
      console.error('Check-in failed', error);
    }
  };

  const handleCheckOut = async () => {
    try {
      await attendanceAPI.checkOut();
      // Refresh data
      window.location.reload();
    } catch (error) {
      console.error('Check-out failed', error);
    }
  };

  if (loading) return <div>Loading attendance...</div>;

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">Attendance</h2>

      <div className="flex gap-4 mb-6">
        <button onClick={handleCheckIn} className="btn-primary">
          Check In
        </button>
        <button onClick={handleCheckOut} className="btn-primary">
          Check Out
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Check In</th>
              <th className="px-4 py-2 text-left">Check Out</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record._id} className="border-t">
                <td className="px-4 py-2">
                  {new Date(record.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  {record.checkInTime
                    ? new Date(record.checkInTime).toLocaleTimeString()
                    : '-'}
                </td>
                <td className="px-4 py-2">
                  {record.checkOutTime
                    ? new Date(record.checkOutTime).toLocaleTimeString()
                    : '-'}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      record.status === 'present'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
