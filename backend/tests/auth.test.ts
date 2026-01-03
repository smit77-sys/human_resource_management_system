import request from 'supertest';
import app from '../src/app';
import { User } from '../src/models/User';

describe('Auth Controller', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /api/auth/signup', () => {
    it('should register a new user', async () => {
      const res = await request(app).post('/api/auth/signup').send({
        employeeId: 'EMP001',
        email: 'test@example.com',
        password: 'Password123',
        firstName: 'John',
        lastName: 'Doe',
        role: 'employee',
      });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user.email).toBe('test@example.com');
    });

    it('should fail with duplicate email', async () => {
      await User.create({
        employeeId: 'EMP001',
        email: 'test@example.com',
        password: 'Password123',
        firstName: 'John',
        lastName: 'Doe',
      });

      const res = await request(app).post('/api/auth/signup').send({
        employeeId: 'EMP002',
        email: 'test@example.com',
        password: 'Password123',
        firstName: 'Jane',
        lastName: 'Doe',
        role: 'employee',
      });

      expect(res.status).toBe(400);
    });
  });

  describe('POST /api/auth/signin', () => {
    beforeEach(async () => {
      const user = new User({
        employeeId: 'EMP001',
        email: 'test@example.com',
        password: 'Password123',
        firstName: 'John',
        lastName: 'Doe',
      });
      await user.save();
    });

    it('should login user with valid credentials', async () => {
      const res = await request(app).post('/api/auth/signin').send({
        email: 'test@example.com',
        password: 'Password123',
      });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.token).toBeDefined();
    });

    it('should fail with invalid credentials', async () => {
      const res = await request(app).post('/api/auth/signin').send({
        email: 'test@example.com',
        password: 'wrongpassword',
      });

      expect(res.status).toBe(401);
    });
  });
});
