import express from 'express';
import { authMiddleware, adminMiddleware } from '../middleware/auth';
import * as payrollController from '../controllers/payrollController';

const router = express.Router();

/**
 * @swagger
 * /api/payroll/my-payroll:
 *   get:
 *     summary: Get current user payroll
 *     tags: [Payroll]
 *     security:
 *       - BearerAuth: []
 */
router.get('/my-payroll', authMiddleware, payrollController.getMyPayroll);

/**
 * @swagger
 * /api/payroll/all:
 *   get:
 *     summary: Get all payroll records
 *     tags: [Payroll]
 *     security:
 *       - BearerAuth: []
 */
router.get('/all', authMiddleware, adminMiddleware, payrollController.getAllPayroll);

/**
 * @swagger
 * /api/payroll/analytics:
 *   get:
 *     summary: Get payroll analytics
 *     tags: [Payroll]
 *     security:
 *       - BearerAuth: []
 */
router.get('/analytics', authMiddleware, adminMiddleware, payrollController.getPayrollAnalytics);

/**
 * @swagger
 * /api/payroll/employee/{employeeId}:
 *   get:
 *     summary: Get employee payroll
 *     tags: [Payroll]
 *     security:
 *       - BearerAuth: []
 */
router.get('/employee/:employeeId', authMiddleware, adminMiddleware, payrollController.getEmployeePayroll);

/**
 * @swagger
 * /api/payroll/create:
 *   post:
 *     summary: Create payroll
 *     tags: [Payroll]
 *     security:
 *       - BearerAuth: []
 */
router.post('/create', authMiddleware, adminMiddleware, payrollController.createPayroll);

/**
 * @swagger
 * /api/payroll/{payrollId}:
 *   put:
 *     summary: Update payroll
 *     tags: [Payroll]
 *     security:
 *       - BearerAuth: []
 */
router.put('/:payrollId', authMiddleware, adminMiddleware, payrollController.updatePayroll);

export default router;
