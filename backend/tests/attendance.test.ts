import { connectDatabase, disconnectDatabase } from '../src/config/database';
import { Attendance } from '../src/models/Attendance';
import { Employee } from '../src/models/Employee';
import { User } from '../src/models/User';

describe('Attendance Service', () => {
  let employeeId: string;

  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await disconnectDatabase();
  });

  beforeEach(async () => {
    await User.deleteMany({});
    await Employee.deleteMany({});
    await Attendance.deleteMany({});

    const user = new User({
      employeeId: 'EMP001',
      email: 'test@example.com',
      password: 'Password123',
      firstName: 'John',
      lastName: 'Doe',
    });

    await user.save();

    const employee = new Employee({
      userId: user._id,
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
    });

    await employee.save();
    employeeId = employee._id.toString();
  });

  describe('Check In/Out', () => {
    it('should record check-in time', async () => {
      const attendance = new Attendance({
        employeeId,
        date: new Date(),
        checkInTime: new Date(),
        status: 'present',
      });

      await attendance.save();

      const saved = await Attendance.findById(attendance._id);
      expect(saved?.checkInTime).toBeDefined();
      expect(saved?.status).toBe('present');
    });

    it('should record check-out time', async () => {
      const now = new Date();
      const checkInTime = new Date(now.getTime() - 60000);

      const attendance = new Attendance({
        employeeId,
        date: now,
        checkInTime,
        checkOutTime: now,
        status: 'present',
      });

      await attendance.save();

      const saved = await Attendance.findById(attendance._id);
      expect(saved?.checkOutTime).toBeDefined();
    });
  });
});
