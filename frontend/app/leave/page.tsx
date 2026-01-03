'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useState, useEffect, FormEvent } from 'react';
import { leaveAPI } from '@/lib/api-endpoints';

interface LeaveRequest {
  _id: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
}

export default function LeavePage() {
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [balance, setBalance] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchLeaves();
    fetchBalance();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response: any = await leaveAPI.getMyLeaves();
      setLeaves(response.data);
    } catch (error) {
      console.error('Failed to fetch leaves', error);
    }
  };

  const fetchBalance = async () => {
    try {
      const response: any = await leaveAPI.getBalance();
      setBalance(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch balance', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await leaveAPI.apply({
        leaveType: formData.get('leaveType'),
        startDate: new Date(formData.get('startDate') as string),
        endDate: new Date(formData.get('endDate') as string),
        reason: formData.get('reason'),
      });

      setShowForm(false);
      fetchLeaves();
    } catch (error) {
      console.error('Failed to apply for leave', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Leave Management</h1>

        {!loading && balance && (
          <div className="grid grid-cols-2 gap-4">
            <div className="card">
              <p className="text-gray-600">Paid Leave Used</p>
              <p className="text-3xl font-bold">{balance.paidLeaveUsed}</p>
              <p className="text-sm text-gray-500">Remaining: {balance.paidLeaveRemaining}</p>
            </div>
            <div className="card">
              <p className="text-gray-600">Sick Leave Used</p>
              <p className="text-3xl font-bold">{balance.sickLeaveUsed}</p>
              <p className="text-sm text-gray-500">Remaining: {balance.sickLeaveRemaining}</p>
            </div>
          </div>
        )}

        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          {showForm ? 'Cancel' : 'Apply for Leave'}
        </button>

        {showForm && (
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Apply for Leave</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="form-label">Leave Type</label>
                <select name="leaveType" className="form-input" aria-label="Leave Type" required>
                  <option value="paid">Paid Leave</option>
                  <option value="sick">Sick Leave</option>
                  <option value="unpaid">Unpaid Leave</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Start Date</label>
                  <input type="date" name="startDate" className="form-input" aria-label="Start Date" required />
                </div>
                <div>
                  <label className="form-label">End Date</label>
                  <input type="date" name="endDate" className="form-input" aria-label="End Date" required />
                </div>
              </div>
              <div>
                <label className="form-label">Reason</label>
                <textarea name="reason" className="form-input" aria-label="Reason for Leave" required></textarea>
              </div>
              <button type="submit" className="btn-primary">
                Submit Leave Request
              </button>
            </form>
          </div>
        )}

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Your Leave Requests</h2>
          <div className="space-y-3">
            {leaves.map((leave) => (
              <div key={leave._id} className="border p-4 rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{leave.leaveType}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(leave.startDate).toLocaleDateString()} -{' '}
                      {new Date(leave.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm">{leave.reason}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded text-sm ${
                      leave.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : leave.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {leave.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
