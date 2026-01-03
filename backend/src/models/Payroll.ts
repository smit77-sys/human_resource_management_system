import { Schema, model, Document, Types } from 'mongoose';

export interface IPayroll extends Document {
  employeeId: Types.ObjectId;
  month: Date;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'pending' | 'processed' | 'paid';
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

const payrollSchema = new Schema<IPayroll>(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    month: {
      type: Date,
      required: true,
    },
    basicSalary: {
      type: Number,
      required: true,
    },
    allowances: {
      type: Number,
      default: 0,
    },
    deductions: {
      type: Number,
      default: 0,
    },
    netSalary: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'processed', 'paid'],
      default: 'pending',
    },
    remarks: String,
  },
  { timestamps: true }
);

// Index for faster queries
payrollSchema.index({ employeeId: 1, month: -1 });

export const Payroll = model<IPayroll>('Payroll', payrollSchema);
