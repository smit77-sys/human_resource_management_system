import { Schema, model, Document, Types } from 'mongoose';

export interface IAttendance extends Document {
  employeeId: Types.ObjectId;
  date: Date;
  checkInTime?: Date;
  checkOutTime?: Date;
  status: 'present' | 'absent' | 'half-day' | 'leave';
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

const attendanceSchema = new Schema<IAttendance>(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    checkInTime: Date,
    checkOutTime: Date,
    status: {
      type: String,
      enum: ['present', 'absent', 'half-day', 'leave'],
      default: 'absent',
    },
    remarks: String,
  },
  { timestamps: true }
);

// Index for faster queries
attendanceSchema.index({ employeeId: 1, date: -1 });

export const Attendance = model<IAttendance>('Attendance', attendanceSchema);
