import { Schema, model, Document, Types } from 'mongoose';

export interface IEmployee extends Document {
  userId: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  dateOfBirth: Date;
  joiningDate: Date;
  designation: string;
  department: string;
  reportingManager?: Types.ObjectId;
  salary: number;
  profilePicture?: string;
  documents?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const employeeSchema = new Schema<IEmployee>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    firstName: String,
    lastName: String,
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    dateOfBirth: Date,
    joiningDate: {
      type: Date,
      default: Date.now,
    },
    designation: String,
    department: String,
    reportingManager: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
    },
    salary: {
      type: Number,
      default: 0,
    },
    profilePicture: String,
    documents: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Employee = model<IEmployee>('Employee', employeeSchema);
