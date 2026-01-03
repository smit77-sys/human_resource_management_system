import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { AuthService } from '../services/AuthService';
import { signUpValidation, signInValidation } from '../utils/validation';

const authService = new AuthService();

export const signup = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { error, value } = signUpValidation.validate(req.body);

    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const result = await authService.signup(value);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const signin = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { error, value } = signInValidation.validate(req.body);

    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const result = await authService.signin(value.email, value.password);

    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export const verifyEmail = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { token } = req.body;

    if (!token) {
      res.status(400).json({ message: 'Verification token is required' });
      return;
    }

    const result = await authService.verifyEmail(token);

    res.status(200).json({
      success: true,
      message: 'Email verified successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const refreshToken = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    const result = await authService.refreshToken(req.user.userId);

    res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
