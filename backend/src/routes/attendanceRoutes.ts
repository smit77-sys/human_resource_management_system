import express from 'express';
import { authMiddleware, adminMiddleware } from '../middleware/auth';
import * as attendanceController from '../controllers/attendanceController';

const router = express.Router();

/**
 * @swagger
 * /api/attendance/check-in:
 *   post:
 *     summary: Check in
 *     tags: [Attendance]
 *     security:
 *       - BearerAuth: []
 */
router.post('/check-in', authMiddleware, attendanceController.checkIn);

/**
 * @swagger
 * /api/attendance/check-out:
 *   post:
 *     summary: Check out
 *     tags: [Attendance]
 *     security:
 *       - BearerAuth: []
 */
router.post('/check-out', authMiddleware, attendanceController.checkOut);

/**
 * @swagger
 * /api/attendance/my-attendance:
 *   get:
 *     summary: Get current user attendance
 *     tags: [Attendance]
 *     security:
 *       - BearerAuth: []
 */
router.get('/my-attendance', authMiddleware, attendanceController.getMyAttendance);

/**
 * @swagger
 * /api/attendance/all:
 *   get:
 *     summary: Get all employees attendance
 *     tags: [Attendance]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema: { type: string, format: date }
 */
router.get('/all', authMiddleware, adminMiddleware, attendanceController.getAllAttendance);

/**
 * @swagger
 * /api/attendance/{employeeId}:
 *   get:
 *     summary: Get employee attendance
 *     tags: [Attendance]
 *     security:
 *       - BearerAuth: []
 */
router.get('/:employeeId', authMiddleware, attendanceController.getEmployeeAttendance);

/**
 * @swagger
 * /api/attendance/{employeeId}:
 *   post:
 *     summary: Mark attendance
 *     tags: [Attendance]
 *     security:
 *       - BearerAuth: []
 */
router.post('/:employeeId', authMiddleware, adminMiddleware, attendanceController.markAttendance);

export default router;
