'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useState, useEffect } from 'react';
import { employeeAPI, leaveAPI } from '@/lib/api-endpoints';

export default function AdminPage() {
  const [employees, setEmployees] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('employees');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activeTab === 'employees') {
      fetchEmployees();
    } else {
      fetchLeaves();
    }
  }, [activeTab]);

  const fetchEmployees = async () => {
    try {
      const response: any = await employeeAPI.getAll();
      setEmployees(response.data.employees);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch employees', error);
      setLoading(false);
    }
  };

  const fetchLeaves = async () => {
    try {
      const response: any = await leaveAPI.getAll();
      setLeaveRequests(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch leaves', error);
      setLoading(false);
    }
  };

  const handleApproveLeave = async (leaveId: string) => {
    try {
      await leaveAPI.approve(leaveId);
      fetchLeaves();
    } catch (error) {
      console.error('Failed to approve leave', error);
    }
  };

  const handleRejectLeave = async (leaveId: string) => {
    try {
      await leaveAPI.reject(leaveId, 'Rejected by admin');
      fetchLeaves();
    } catch (error) {
      console.error('Failed to reject leave', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>

        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('employees')}
            className={`px-4 py-2 rounded ${
              activeTab === 'employees'
                ? 'btn-primary'
                : 'btn-secondary'
            }`}
          >
            Employees
          </button>
          <button
            onClick={() => setActiveTab('leaves')}
            className={`px-4 py-2 rounded ${
              activeTab === 'leaves'
                ? 'btn-primary'
                : 'btn-secondary'
            }`}
          >
            Leave Requests
          </button>
        </div>

        {activeTab === 'employees' && (
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Employees</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Designation</th>
                      <th className="px-4 py-2 text-left">Department</th>
                      <th className="px-4 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((emp: any) => (
                      <tr key={emp._id} className="border-t">
                        <td className="px-4 py-2">
                          {emp.firstName} {emp.lastName}
                        </td>
                        <td className="px-4 py-2">{emp.email}</td>
                        <td className="px-4 py-2">{emp.designation}</td>
                        <td className="px-4 py-2">{emp.department}</td>
                        <td className="px-4 py-2">
                          <button className="btn-secondary text-sm">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'leaves' && (
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Leave Requests</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="space-y-4">
                {leaveRequests.map((leave: any) => (
                  <div key={leave._id} className="border p-4 rounded">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold">
                          {leave.employeeId?.firstName} {leave.employeeId?.lastName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {leave.leaveType} - {leave.reason}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(leave.startDate).toLocaleDateString()} to{' '}
                          {new Date(leave.endDate).toLocaleDateString()}
                        </p>
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

                    {leave.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApproveLeave(leave._id)}
                          className="btn btn-primary"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejectLeave(leave._id)}
                          className="btn btn-danger"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
