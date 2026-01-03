import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { PayrollService } from '../services/PayrollService';

const payrollService = new PayrollService();

export const getMyPayroll = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    const { Employee } = await import('../models/Employee');
    const employee = await Employee.findOne({ userId: req.user.userId });

    if (!employee) {
      res.status(404).json({ message: 'Employee profile not found' });
      return;
    }

    const payroll = await payrollService.getPayroll(employee._id.toString());

    res.status(200).json({
      success: true,
      message: 'Payroll fetched successfully',
      data: payroll,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getEmployeePayroll = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { employeeId } = req.params;

    const payroll = await payrollService.getPayroll(employeeId);

    res.status(200).json({
      success: true,
      message: 'Payroll fetched successfully',
      data: payroll,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPayroll = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const payroll = await payrollService.getPayroll();

    res.status(200).json({
      success: true,
      message: 'Payroll records fetched successfully',
      data: payroll,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createPayroll = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { employeeId, month, basicSalary, allowances, deductions } = req.body;

    if (!employeeId || !month || !basicSalary) {
      res.status(400).json({
        message: 'Employee ID, month, and basic salary are required',
      });
      return;
    }

    const payroll = await payrollService.createPayroll({
      employeeId,
      month: new Date(month),
      basicSalary,
      allowances,
      deductions,
    });

    res.status(201).json({
      success: true,
      message: 'Payroll created successfully',
      data: payroll,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updatePayroll = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { payrollId } = req.params;

    const payroll = await payrollService.updatePayroll(payrollId, req.body);

    res.status(200).json({
      success: true,
      message: 'Payroll updated successfully',
      data: payroll,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getPayrollAnalytics = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const analytics = await payrollService.getPayrollAnalytics();

    res.status(200).json({
      success: true,
      message: 'Payroll analytics fetched successfully',
      data: analytics,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
