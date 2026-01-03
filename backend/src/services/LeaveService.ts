import { Leave } from '../models/Leave';
import { Types } from 'mongoose';

export class LeaveService {
  async applyForLeave(data: {
    employeeId: string;
    leaveType: string;
    startDate: Date;
    endDate: Date;
    reason: string;
  }) {
    const leave = new Leave({
      employeeId: new Types.ObjectId(data.employeeId),
      leaveType: data.leaveType,
      startDate: data.startDate,
      endDate: data.endDate,
      reason: data.reason,
      status: 'pending',
    });

    await leave.save();
    return leave;
  }

  async getLeaveRequests(employeeId?: string, status?: string) {
    const query: any = {};

    if (employeeId) {
      query.employeeId = new Types.ObjectId(employeeId);
    }

    if (status) {
      query.status = status;
    }

    const leaves = await Leave.find(query)
      .populate('employeeId', 'firstName lastName email')
      .populate('approvedBy', 'firstName lastName email')
      .sort({ createdAt: -1 });

    return leaves;
  }

  async approveLeave(leaveId: string, approvedBy: string, remarks?: string) {
    const leave = await Leave.findByIdAndUpdate(
      leaveId,
      {
        status: 'approved',
        approvedBy: new Types.ObjectId(approvedBy),
        remarks,
      },
      { new: true }
    );

    if (!leave) {
      throw new Error('Leave request not found');
    }

    return leave;
  }

  async rejectLeave(leaveId: string, rejectionReason: string) {
    const leave = await Leave.findByIdAndUpdate(
      leaveId,
      {
        status: 'rejected',
        rejectionReason,
      },
      { new: true }
    );

    if (!leave) {
      throw new Error('Leave request not found');
    }

    return leave;
  }

  async getEmployeeLeaveBalance(employeeId: string) {
    const leaves = await Leave.find({
      employeeId: new Types.ObjectId(employeeId),
      status: 'approved',
    });

    const paidLeaveCount = leaves.filter((l) => l.leaveType === 'paid').length;
    const sickLeaveCount = leaves.filter((l) => l.leaveType === 'sick').length;

    return {
      paidLeaveUsed: paidLeaveCount,
      sickLeaveUsed: sickLeaveCount,
      paidLeaveRemaining: 20 - paidLeaveCount,
      sickLeaveRemaining: 10 - sickLeaveCount,
    };
  }
}
