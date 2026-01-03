import express from 'express';
import { authMiddleware, adminMiddleware } from '../middleware/auth';
import * as employeeController from '../controllers/employeeController';

const router = express.Router();

/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Get all employees
 *     tags: [Employees]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: number }
 *       - in: query
 *         name: limit
 *         schema: { type: number }
 */
router.get('/', authMiddleware, adminMiddleware, employeeController.getAllEmployees);

/**
 * @swagger
 * /api/employees/search:
 *   get:
 *     summary: Search employees
 *     tags: [Employees]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         schema: { type: string }
 */
router.get('/search', authMiddleware, employeeController.searchEmployees);

/**
 * @swagger
 * /api/employees/profile/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [Employees]
 *     security:
 *       - BearerAuth: []
 */
router.get('/profile/me', authMiddleware, employeeController.getMyProfile);

/**
 * @swagger
 * /api/employees/profile/me:
 *   put:
 *     summary: Update current user profile
 *     tags: [Employees]
 *     security:
 *       - BearerAuth: []
 */
router.put('/profile/me', authMiddleware, employeeController.updateMyProfile);

/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Get employee by ID
 *     tags: [Employees]
 *     security:
 *       - BearerAuth: []
 */
router.get('/:id', authMiddleware, employeeController.getEmployeeById);

/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     summary: Update employee
 *     tags: [Employees]
 *     security:
 *       - BearerAuth: []
 */
router.put('/:id', authMiddleware, adminMiddleware, employeeController.updateEmployee);

/**
 * @swagger
 * /api/employees/{id}:
 *   delete:
 *     summary: Delete employee
 *     tags: [Employees]
 *     security:
 *       - BearerAuth: []
 */
router.delete('/:id', authMiddleware, adminMiddleware, employeeController.deleteEmployee);

export default router;
