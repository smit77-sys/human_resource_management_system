'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useState, useEffect } from 'react';
import { payrollAPI } from '@/lib/api-endpoints';

interface PayrollRecord {
  _id: string;
  month: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: string;
}

export default function PayrollPage() {
  const [payroll, setPayroll] = useState<PayrollRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayroll = async () => {
      try {
        const response: any = await payrollAPI.getMyPayroll();
        setPayroll(response.data);
      } catch (error) {
        console.error('Failed to fetch payroll', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayroll();
  }, []);

  return (
    <ProtectedRoute>
      <div className="card">
        <h1 className="text-3xl font-bold mb-8">Payroll Information</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Month</th>
                  <th className="px-4 py-2 text-right">Basic Salary</th>
                  <th className="px-4 py-2 text-right">Allowances</th>
                  <th className="px-4 py-2 text-right">Deductions</th>
                  <th className="px-4 py-2 text-right">Net Salary</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {payroll.map((record) => (
                  <tr key={record._id} className="border-t">
                    <td className="px-4 py-2">
                      {new Date(record.month).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                      })}
                    </td>
                    <td className="px-4 py-2 text-right">
                      ${record.basicSalary.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-right">
                      ${record.allowances.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-right">
                      ${record.deductions.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-right font-bold">
                      ${record.netSalary.toFixed(2)}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          record.status === 'paid'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
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
        )}
      </div>
    </ProtectedRoute>
  );
}
