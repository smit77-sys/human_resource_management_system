import { User } from '../models/User';
import { Employee } from '../models/Employee';
import { generateToken, TokenPayload } from '../utils/jwt';
import crypto from 'crypto';

export class AuthService {
  async signup(data: {
    employeeId: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
  }) {
    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email: data.email }, { employeeId: data.employeeId }] 
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create user
    const user = new User({
      employeeId: data.employeeId,
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      emailVerificationToken: crypto.randomBytes(32).toString('hex'),
    });

    await user.save();

    // Create employee profile
    const employee = new Employee({
      userId: user._id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    });

    await employee.save();

    const token: TokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    return {
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      token: generateToken(token),
    };
  }

  async signin(email: string, password: string) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token: TokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    return {
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      token: generateToken(token),
    };
  }

  async verifyEmail(token: string) {
    const user = await User.findOne({ emailVerificationToken: token });

    if (!user) {
      throw new Error('Invalid verification token');
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();

    return { message: 'Email verified successfully' };
  }

  async refreshToken(userId: string) {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const token: TokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    return { token: generateToken(token) };
  }
}
