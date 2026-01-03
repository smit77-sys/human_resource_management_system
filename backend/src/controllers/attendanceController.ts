import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { AttendanceService } from '../services/AttendanceService';
import { attendanceValidation } from '../utils/validation';

const attendanceService = new AttendanceService();

export const checkIn = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    // Get employee by user ID
    const { Employee } = await import('../models/Employee');
    const employee = await Employee.findOne({ userId: req.user.userId });

    if (!employee) {
      res.status(404).json({ message: 'Employee profile not found' });
      return;
    }

    const attendance = await attendanceService.checkIn(employee._id.toString());

    res.status(200).json({
      success: true,
      message: 'Checked in successfully',
      data: attendance,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const checkOut = async (req: AuthRequest, res: Response): Promise<void> => {
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

    const attendance = await attendanceService.checkOut(employee._id.toString());

    res.status(200).json({
      success: true,
      message: 'Checked out successfully',
      data: attendance,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getMyAttendance = async (req: AuthRequest, res: Response): Promise<void> => {
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

    const { startDate, endDate } = req.query;

    let start, end;
    if (startDate && endDate) {
      start = new Date(startDate as string);
      end = new Date(endDate as string);
    } else {
      end = new Date();
      start = new Date(end.getFullYear(), end.getMonth(), 1);
    }

    const attendance = await attendanceService.getAttendanceByDateRange(
      employee._id.toString(),
      start,
      end
    );

    res.status(200).json({
      success: true,
      message: 'Attendance fetched successfully',
      data: attendance,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getEmployeeAttendance = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { employeeId } = req.params;
    const { startDate, endDate } = req.query;

    let start, end;
    if (startDate && endDate) {
      start = new Date(startDate as string);
      end = new Date(endDate as string);
    } else {
      end = new Date();
      start = new Date(end.getFullYear(), end.getMonth(), 1);
    }

    const attendance = await attendanceService.getAttendanceByDateRange(employeeId, start, end);

    res.status(200).json({
      success: true,
      message: 'Attendance fetched successfully',
      data: attendance,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const markAttendance = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { employeeId } = req.params;
    const { error, value } = attendanceValidation.validate(req.body);

    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const attendance = await attendanceService.markAttendance(
      employeeId,
      value.date,
      value.status,
      value.remarks
    );

    res.status(200).json({
      success: true,
      message: 'Attendance marked successfully',
      data: attendance,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllAttendance = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      res.status(400).json({ message: 'Start date and end date are required' });
      return;
    }

    const attendance = await attendanceService.getAllEmployeesAttendance(
      new Date(startDate as string),
      new Date(endDate as string)
    );

    res.status(200).json({
      success: true,
      message: 'Attendance fetched successfully',
      data: attendance,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
