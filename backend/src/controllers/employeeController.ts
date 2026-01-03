import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { EmployeeService } from '../services/EmployeeService';
import { employeeProfileValidation } from '../utils/validation';

const employeeService = new EmployeeService();

export const getAllEmployees = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await employeeService.getAllEmployees(page, limit);

    res.status(200).json({
      success: true,
      message: 'Employees fetched successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getEmployeeById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const employee = await employeeService.getEmployeeById(id);

    res.status(200).json({
      success: true,
      message: 'Employee fetched successfully',
      data: employee,
    });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const getMyProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    const employee = await employeeService.getEmployeeByUserId(req.user.userId);

    res.status(200).json({
      success: true,
      message: 'Profile fetched successfully',
      data: employee,
    });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const updateMyProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    const { error, value } = employeeProfileValidation.validate(req.body);

    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const employee = await employeeService.getEmployeeByUserId(req.user.userId);
    const updated = await employeeService.updateEmployeeProfile(
      employee._id.toString(),
      value
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updated,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateEmployee = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const employee = await employeeService.updateEmployeeProfile(id, req.body);

    res.status(200).json({
      success: true,
      message: 'Employee updated successfully',
      data: employee,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteEmployee = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const employee = await employeeService.deleteEmployee(id);

    res.status(200).json({
      success: true,
      message: 'Employee deleted successfully',
      data: employee,
    });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const searchEmployees = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { query } = req.query;

    if (!query) {
      res.status(400).json({ message: 'Search query is required' });
      return;
    }

    const employees = await employeeService.searchEmployees(query as string);

    res.status(200).json({
      success: true,
      message: 'Employees found',
      data: employees,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
