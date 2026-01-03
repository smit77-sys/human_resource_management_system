import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { LeaveService } from '../services/LeaveService';
import { leaveApplicationValidation } from '../utils/validation';

const leaveService = new LeaveService();

export const applyForLeave = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    const { error, value } = leaveApplicationValidation.validate(req.body);

    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const { Employee } = await import('../models/Employee');
    const employee = await Employee.findOne({ userId: req.user.userId });

    if (!employee) {
      res.status(404).json({ message: 'Employee profile not found' });
      return;
    }

    const leave = await leaveService.applyForLeave({
      employeeId: employee._id.toString(),
      leaveType: value.leaveType,
      startDate: value.startDate,
      endDate: value.endDate,
      reason: value.reason,
    });

    res.status(201).json({
      success: true,
      message: 'Leave application submitted successfully',
      data: leave,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getMyLeaves = async (req: AuthRequest, res: Response): Promise<void> => {
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

    const leaves = await leaveService.getLeaveRequests(employee._id.toString());

    res.status(200).json({
      success: true,
      message: 'Leave requests fetched successfully',
      data: leaves,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getLeaveBalance = async (req: AuthRequest, res: Response): Promise<void> => {
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

    const balance = await leaveService.getEmployeeLeaveBalance(employee._id.toString());

    res.status(200).json({
      success: true,
      message: 'Leave balance fetched successfully',
      data: balance,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllLeaveRequests = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status } = req.query;

    const leaves = await leaveService.getLeaveRequests(undefined, status as string);

    res.status(200).json({
      success: true,
      message: 'Leave requests fetched successfully',
      data: leaves,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const approveLeave = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { leaveId } = req.params;
    const { remarks } = req.body;

    if (!req.user) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    const leave = await leaveService.approveLeave(leaveId, req.user.userId, remarks);

    res.status(200).json({
      success: true,
      message: 'Leave approved successfully',
      data: leave,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const rejectLeave = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { leaveId } = req.params;
    const { rejectionReason } = req.body;

    if (!rejectionReason) {
      res.status(400).json({ message: 'Rejection reason is required' });
      return;
    }

    const leave = await leaveService.rejectLeave(leaveId, rejectionReason);

    res.status(200).json({
      success: true,
      message: 'Leave rejected successfully',
      data: leave,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
