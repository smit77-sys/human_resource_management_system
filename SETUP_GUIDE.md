# Human Resource Management System (HRMS) - Quick Start Guide

## 🚀 Getting Started

### System Requirements
- Node.js 18+ and npm 9+
- MongoDB (local or cloud Atlas)
- Git
- Docker & Docker Compose (optional)

---

## 📋 Setup Option 1: Local Development (Recommended for Development)

### Step 1: Clone & Navigate

```bash
cd human_resource_management_system
```

### Step 2: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your settings:
# MONGODB_URI=mongodb://localhost:27017/human_resource_management_system
# JWT_SECRET=your_secret_key_here

# Run tests
npm test

# Start development server
npm run dev
```

The backend will run on: `http://localhost:5000`

**API Documentation:** `http://localhost:5000/api-docs`

### Step 3: Setup Frontend (in a new terminal)

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.local.example .env.local

# Start development server
npm run dev
```

The frontend will run on: `http://localhost:3000`

---

## 🐳 Setup Option 2: Using Docker & Docker Compose (Recommended for Production)

### Quick Start with Docker Compose

```bash
# In the human_resource_management_system root directory
docker-compose up -d

# Wait for services to be ready (30 seconds)
```

Access the application:
- **Frontend:** `http://localhost:3000`
- **Backend API:** `http://localhost:5000`
- **API Docs:** `http://localhost:5000/api-docs`
- **MongoDB:** `localhost:27017`

### Stop Services

```bash
docker-compose down
```

---

## 🧪 Running Tests

### Backend Tests

```bash
cd backend
npm test                    # Run all tests
npm run test:coverage       # Run tests with coverage report
npm run test:watch        # Run tests in watch mode
```

### Frontend Tests

```bash
cd frontend
npm test                    # Run all tests
npm run test:coverage       # Run tests with coverage report
npm run test:watch        # Run tests in watch mode
```

---

## 📦 Building for Production

### Build Backend

```bash
cd backend
npm run build              # Compiles TypeScript to JavaScript
npm start                  # Start production server
```

### Build Frontend

```bash
cd frontend
npm run build              # Creates optimized production build
npm start                  # Start production server
```

---

## 🔑 Testing the Application

### Sample Credentials

Use these for testing (or create new users via signup):

```
Email: test@example.com
Password: Password123
Employee ID: EMP001
Role: employee
```

### Test Workflow

1. **Sign Up / Login**
   - Visit `http://localhost:3000/login` or `/signup`
   - Create account or login with test credentials

2. **Dashboard**
   - View your profile and recent activity
   - Quick access to all features

3. **Attendance**
   - Click "Check In" and "Check Out"
   - View attendance history

4. **Leave Management**
   - Apply for leave (Paid/Sick/Unpaid)
   - Check leave balance
   - View leave request status

5. **Payroll**
   - View salary information
   - Check payroll history

### Admin Features (Login as Admin)

For admin features, sign up with role `admin`:
- Manage employees
- Approve/reject leave requests
- View all attendance records
- Manage payroll

---

## 📊 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register
- `POST /api/auth/signin` - Login
- `POST /api/auth/verify-email` - Verify email
- `POST /api/auth/refresh` - Refresh token

### Employees
- `GET /api/employees` - Get all employees (Admin)
- `GET /api/employees/:id` - Get employee by ID
- `GET /api/employees/profile/me` - Get my profile
- `PUT /api/employees/profile/me` - Update my profile
- `PUT /api/employees/:id` - Update employee (Admin)
- `DELETE /api/employees/:id` - Delete employee (Admin)

### Attendance
- `POST /api/attendance/check-in` - Check in
- `POST /api/attendance/check-out` - Check out
- `GET /api/attendance/my-attendance` - Get my attendance
- `GET /api/attendance/:employeeId` - Get employee attendance
- `GET /api/attendance/all` - Get all attendance (Admin)
- `POST /api/attendance/:employeeId` - Mark attendance (Admin)

### Leave
- `POST /api/leaves/apply` - Apply for leave
- `GET /api/leaves/my-leaves` - Get my leave requests
- `GET /api/leaves/balance` - Get leave balance
- `GET /api/leaves/all` - Get all leave requests (Admin)
- `POST /api/leaves/:leaveId/approve` - Approve leave (Admin)
- `POST /api/leaves/:leaveId/reject` - Reject leave (Admin)

### Payroll
- `GET /api/payroll/my-payroll` - Get my payroll
- `GET /api/payroll/all` - Get all payroll (Admin)
- `GET /api/payroll/employee/:employeeId` - Get employee payroll
- `GET /api/payroll/analytics` - Get analytics (Admin)
- `POST /api/payroll/create` - Create payroll (Admin)
- `PUT /api/payroll/:payrollId` - Update payroll (Admin)

---

## 🔧 Troubleshooting

### MongoDB Connection Error
```bash
# Make sure MongoDB is running
# If using local MongoDB:
mongod

# Or update MONGODB_URI to use MongoDB Atlas cloud
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/human_resource_management_system
```

### Port Already in Use
```bash
# Change port in .env files
# Backend: PORT=5001
# Frontend: npm run dev -- -p 3001
```

### npm Dependencies Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Tests Failing
```bash
# Make sure MongoDB test database is accessible
# Check .env settings for test environment
MONGODB_TEST_URI=mongodb://localhost:27017/human_resource_management_system-test
```

---

## 📚 Project Structure

```
human_resource_management_system/
├── backend/          # Express.js REST API
│   ├── src/
│   │   ├── config/   # Configuration
│   │   ├── models/   # MongoDB schemas
│   │   ├── services/ # Business logic
│   │   ├── controllers/ # Route handlers
│   │   ├── routes/   # API endpoints
│   │   └── middleware/ # Custom middleware
│   └── tests/        # Test files
│
├── frontend/         # Next.js React app
│   ├── app/         # Pages and layouts
│   ├── components/  # React components
│   ├── lib/         # Utilities and API calls
│   └── __tests__/   # Test files
│
└── docker-compose.yml  # Docker configuration
```

---

## 📝 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/human_resource_management_system
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 🤝 Contributing

1. Create a new branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## ✅ Checklist Before Deployment

- [ ] All tests passing locally
- [ ] Environment variables configured
- [ ] Database connection verified
- [ ] Backend API running and accessible
- [ ] Frontend connected to API
- [ ] Authentication working
- [ ] All CRUD operations tested
- [ ] No console errors
- [ ] CI/CD pipeline passing

---

## 🚀 Deployment

### Deploy to Heroku (Backend)
```bash
cd backend
heroku login
heroku create human-resource-management-system-api
git push heroku main
```

### Deploy to Vercel (Frontend)
```bash
cd frontend
npm install -g vercel
vercel
```

### Deploy with Docker
```bash
docker build -t human_resource_management_system-backend ./backend
docker build -t human_resource_management_system-frontend ./frontend
# Push to Docker Hub and deploy
```

---

## 📞 Support

- **Issues:** Create a GitHub issue
- **Documentation:** See [README.md](README.md)
- **API Docs:** Visit `/api-docs` when backend is running

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

**Happy coding! 🎉**
