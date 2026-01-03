import { Attendance } from '../models/Attendance';
import { Types } from 'mongoose';

export class AttendanceService {
  async checkIn(employeeId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let attendance = await Attendance.findOne({
      employeeId,
      date: { $gte: today },
    });

    if (!attendance) {
      attendance = new Attendance({
        employeeId,
        date: new Date(),
        checkInTime: new Date(),
        status: 'present',
      });
    } else {
      attendance.checkInTime = new Date();
      if (attendance.status === 'absent') {
        attendance.status = 'present';
      }
    }

    await attendance.save();
    return attendance;
  }

  async checkOut(employeeId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOne({
      employeeId,
      date: { $gte: today },
    });

    if (!attendance) {
      throw new Error('No check-in record found for today');
    }

    attendance.checkOutTime = new Date();
    await attendance.save();

    return attendance;
  }

  async getAttendance(employeeId: string, startDate?: Date, endDate?: Date) {
    const query: any = { employeeId };

    if (startDate && endDate) {
      query.date = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    const attendance = await Attendance.find(query).sort({ date: -1 });
    return attendance;
  }

  async getAttendanceByDateRange(
    employeeId: string,
    startDate: Date,
    endDate: Date
  ) {
    const attendance = await Attendance.find({
      employeeId,
      date: { $gte: startDate, $lte: endDate },
    }).sort({ date: -1 });

    return attendance;
  }

  async markAttendance(
    employeeId: string,
    date: Date,
    status: 'present' | 'absent' | 'half-day' | 'leave',
    remarks?: string
  ) {
    const attendanceDate = new Date(date);
    attendanceDate.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOneAndUpdate(
      { employeeId, date: attendanceDate },
      { status, remarks },
      { new: true, upsert: true }
    );

    return attendance;
  }

  async getAllEmployeesAttendance(startDate: Date, endDate: Date) {
    const attendance = await Attendance.find({
      date: { $gte: startDate, $lte: endDate },
    }).populate('employeeId', 'firstName lastName email');

    return attendance;
  }
}
