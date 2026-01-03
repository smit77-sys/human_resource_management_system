import { Payroll } from '../models/Payroll';
import { Types } from 'mongoose';

export class PayrollService {
  async getPayroll(employeeId?: string) {
    const query: any = {};

    if (employeeId) {
      query.employeeId = new Types.ObjectId(employeeId);
    }

    const payroll = await Payroll.find(query)
      .populate('employeeId', 'firstName lastName email')
      .sort({ month: -1 });

    return payroll;
  }

  async getPayrollByMonth(employeeId: string, month: Date) {
    const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);

    const payroll = await Payroll.findOne({
      employeeId: new Types.ObjectId(employeeId),
      month: { $gte: startOfMonth, $lte: endOfMonth },
    });

    return payroll;
  }

  async createPayroll(data: {
    employeeId: string;
    month: Date;
    basicSalary: number;
    allowances?: number;
    deductions?: number;
  }) {
    const allowances = data.allowances || 0;
    const deductions = data.deductions || 0;
    const netSalary = data.basicSalary + allowances - deductions;

    const payroll = new Payroll({
      employeeId: new Types.ObjectId(data.employeeId),
      month: data.month,
      basicSalary: data.basicSalary,
      allowances,
      deductions,
      netSalary,
      status: 'pending',
    });

    await payroll.save();
    return payroll;
  }

  async updatePayroll(
    payrollId: string,
    data: {
      basicSalary?: number;
      allowances?: number;
      deductions?: number;
      status?: string;
    }
  ) {
    const payroll = await Payroll.findById(payrollId);

    if (!payroll) {
      throw new Error('Payroll record not found');
    }

    if (data.basicSalary) payroll.basicSalary = data.basicSalary;
    if (data.allowances !== undefined) payroll.allowances = data.allowances;
    if (data.deductions !== undefined) payroll.deductions = data.deductions;
    if (data.status) payroll.status = data.status as any;

    payroll.netSalary =
      payroll.basicSalary + payroll.allowances - payroll.deductions;

    await payroll.save();
    return payroll;
  }

  async processPayroll(month: Date) {
    const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);

    const payrollRecords = await Payroll.updateMany(
      {
        month: { $gte: startOfMonth, $lte: endOfMonth },
        status: 'pending',
      },
      { status: 'processed' }
    );

    return payrollRecords;
  }

  async getPayrollAnalytics() {
    const totalPayroll = await Payroll.aggregate([
      {
        $group: {
          _id: null,
          totalBasicSalary: { $sum: '$basicSalary' },
          totalAllowances: { $sum: '$allowances' },
          totalDeductions: { $sum: '$deductions' },
          totalNetSalary: { $sum: '$netSalary' },
        },
      },
    ]);

    return totalPayroll[0] || {};
  }
}
