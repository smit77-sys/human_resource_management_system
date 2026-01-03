import express from 'express';
import { authMiddleware, adminMiddleware } from '../middleware/auth';
import * as leaveController from '../controllers/leaveController';

const router = express.Router();

/**
 * @swagger
 * /api/leaves/apply:
 *   post:
 *     summary: Apply for leave
 *     tags: [Leaves]
 *     security:
 *       - BearerAuth: []
 */
router.post('/apply', authMiddleware, leaveController.applyForLeave);

/**
 * @swagger
 * /api/leaves/my-leaves:
 *   get:
 *     summary: Get current user leave requests
 *     tags: [Leaves]
 *     security:
 *       - BearerAuth: []
 */
router.get('/my-leaves', authMiddleware, leaveController.getMyLeaves);

/**
 * @swagger
 * /api/leaves/balance:
 *   get:
 *     summary: Get current user leave balance
 *     tags: [Leaves]
 *     security:
 *       - BearerAuth: []
 */
router.get('/balance', authMiddleware, leaveController.getLeaveBalance);

/**
 * @swagger
 * /api/leaves/all:
 *   get:
 *     summary: Get all leave requests
 *     tags: [Leaves]
 *     security:
 *       - BearerAuth: []
 */
router.get('/all', authMiddleware, adminMiddleware, leaveController.getAllLeaveRequests);

/**
 * @swagger
 * /api/leaves/{leaveId}/approve:
 *   post:
 *     summary: Approve leave request
 *     tags: [Leaves]
 *     security:
 *       - BearerAuth: []
 */
router.post('/:leaveId/approve', authMiddleware, adminMiddleware, leaveController.approveLeave);

/**
 * @swagger
 * /api/leaves/{leaveId}/reject:
 *   post:
 *     summary: Reject leave request
 *     tags: [Leaves]
 *     security:
 *       - BearerAuth: []
 */
router.post('/:leaveId/reject', authMiddleware, adminMiddleware, leaveController.rejectLeave);

export default router;
