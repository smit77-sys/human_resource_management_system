import Joi from 'joi';

export const validateEmail = (email: string): boolean => {
  const schema = Joi.string().email().required();
  const { error } = schema.validate(email);
  return !error;
};

export const validatePassword = (password: string): boolean => {
  const schema = Joi.string()
    .min(6)
    .pattern(/[A-Z]/) // At least one uppercase
    .pattern(/[a-z]/) // At least one lowercase
    .pattern(/[0-9]/) // At least one digit
    .required();
  const { error } = schema.validate(password);
  return !error;
};

export const signUpValidation = Joi.object({
  employeeId: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  role: Joi.string().valid('employee', 'admin', 'hr').default('employee'),
});

export const signInValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const employeeProfileValidation = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  phone: Joi.string(),
  address: Joi.string(),
  city: Joi.string(),
  state: Joi.string(),
  zipCode: Joi.string(),
  dateOfBirth: Joi.date(),
  designation: Joi.string(),
  department: Joi.string(),
});

export const leaveApplicationValidation = Joi.object({
  leaveType: Joi.string()
    .valid('paid', 'sick', 'unpaid', 'maternity', 'paternity')
    .required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().min(Joi.ref('startDate')).required(),
  reason: Joi.string().required(),
});

export const attendanceValidation = Joi.object({
  date: Joi.date().required(),
  status: Joi.string().valid('present', 'absent', 'half-day', 'leave').required(),
  remarks: Joi.string(),
});
