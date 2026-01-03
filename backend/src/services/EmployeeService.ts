import { Employee } from '../models/Employee';
import { Types } from 'mongoose';

export class EmployeeService {
  async getAllEmployees(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const employees = await Employee.find({ isActive: true })
      .populate('userId', 'email firstName lastName role')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Employee.countDocuments({ isActive: true });

    return {
      employees,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getEmployeeById(employeeId: string) {
    const employee = await Employee.findById(employeeId).populate(
      'userId',
      'email firstName lastName role'
    );

    if (!employee) {
      throw new Error('Employee not found');
    }

    return employee;
  }

  async getEmployeeByUserId(userId: string) {
    const employee = await Employee.findOne({ userId });

    if (!employee) {
      throw new Error('Employee profile not found');
    }

    return employee;
  }

  async updateEmployeeProfile(employeeId: string, data: any) {
    const employee = await Employee.findByIdAndUpdate(employeeId, data, {
      new: true,
      runValidators: true,
    });

    if (!employee) {
      throw new Error('Employee not found');
    }

    return employee;
  }

  async deleteEmployee(employeeId: string) {
    const employee = await Employee.findByIdAndUpdate(
      employeeId,
      { isActive: false },
      { new: true }
    );

    if (!employee) {
      throw new Error('Employee not found');
    }

    return employee;
  }

  async searchEmployees(query: string) {
    const employees = await Employee.find({
      $or: [
        { firstName: { $regex: query, $options: 'i' } },
        { lastName: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { designation: { $regex: query, $options: 'i' } },
      ],
      isActive: true,
    });

    return employees;
  }
}
