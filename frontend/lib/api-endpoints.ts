import apiClient from './api';

export const authAPI = {
  signup: (data: any) => apiClient.post('/auth/signup', data),
  signin: (email: string, password: string) =>
    apiClient.post('/auth/signin', { email, password }),
  verifyEmail: (token: string) => apiClient.post('/auth/verify-email', { token }),
  refreshToken: () => apiClient.post('/auth/refresh'),
};

export const employeeAPI = {
  getAll: (page?: number, limit?: number) =>
    apiClient.get('/employees', { params: { page, limit } }),
  getById: (id: string) => apiClient.get(`/employees/${id}`),
  getMyProfile: () => apiClient.get('/employees/profile/me'),
  updateMyProfile: (data: any) => apiClient.put('/employees/profile/me', data),
  update: (id: string, data: any) => apiClient.put(`/employees/${id}`, data),
  delete: (id: string) => apiClient.delete(`/employees/${id}`),
  search: (query: string) => apiClient.get('/employees/search', { params: { query } }),
};

export const attendanceAPI = {
  checkIn: () => apiClient.post('/attendance/check-in'),
  checkOut: () => apiClient.post('/attendance/check-out'),
  getMyAttendance: (startDate?: string, endDate?: string) =>
    apiClient.get('/attendance/my-attendance', { params: { startDate, endDate } }),
  getEmployeeAttendance: (employeeId: string, startDate?: string, endDate?: string) =>
    apiClient.get(`/attendance/${employeeId}`, { params: { startDate, endDate } }),
  getAll: (startDate: string, endDate: string) =>
    apiClient.get('/attendance/all', { params: { startDate, endDate } }),
  mark: (employeeId: string, data: any) =>
    apiClient.post(`/attendance/${employeeId}`, data),
};

export const leaveAPI = {
  apply: (data: any) => apiClient.post('/leaves/apply', data),
  getMyLeaves: () => apiClient.get('/leaves/my-leaves'),
  getBalance: () => apiClient.get('/leaves/balance'),
  getAll: (status?: string) => apiClient.get('/leaves/all', { params: { status } }),
  approve: (leaveId: string, remarks?: string) =>
    apiClient.post(`/leaves/${leaveId}/approve`, { remarks }),
  reject: (leaveId: string, rejectionReason: string) =>
    apiClient.post(`/leaves/${leaveId}/reject`, { rejectionReason }),
};

export const payrollAPI = {
  getMyPayroll: () => apiClient.get('/payroll/my-payroll'),
  getAll: () => apiClient.get('/payroll/all'),
  getEmployee: (employeeId: string) =>
    apiClient.get(`/payroll/employee/${employeeId}`),
  create: (data: any) => apiClient.post('/payroll/create', data),
  update: (payrollId: string, data: any) =>
    apiClient.put(`/payroll/${payrollId}`, data),
  getAnalytics: () => apiClient.get('/payroll/analytics'),
};
