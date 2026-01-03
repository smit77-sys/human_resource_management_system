import { connectDatabase, disconnectDatabase } from '../src/config/database';
import { User } from '../src/models/User';
import { Employee } from '../src/models/Employee';

describe('Employee Service', () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await disconnectDatabase();
  });

  beforeEach(async () => {
    await User.deleteMany({});
    await Employee.deleteMany({});
  });

  describe('Create Employee', () => {
    it('should create employee when user is registered', async () => {
      const user = new User({
        employeeId: 'EMP001',
        email: 'emp@example.com',
        password: 'Password123',
        firstName: 'John',
        lastName: 'Doe',
      });

      await user.save();

      const employee = new Employee({
        userId: user._id,
        firstName: 'John',
        lastName: 'Doe',
        email: 'emp@example.com',
        designation: 'Developer',
        department: 'IT',
        salary: 50000,
      });

      await employee.save();

      const savedEmployee = await Employee.findById(employee._id);
      expect(savedEmployee?.firstName).toBe('John');
      expect(savedEmployee?.designation).toBe('Developer');
    });
  });
});
