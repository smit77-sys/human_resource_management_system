# Human Resource Management System (HRMS) - Installation & Usage Guide

## Quick Start

### Prerequisites ✅
- Node.js 18+
- MongoDB 5.0+
- npm 9+

### Installation

#### 1️⃣ Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```
Backend runs on: `http://localhost:5000`

#### 2️⃣ Frontend Setup (New Terminal)
```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```
Frontend runs on: `http://localhost:3000`

---

## 🐳 Docker Setup (One Command)

```bash
docker-compose up -d
```

Access:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- API Docs: `http://localhost:5000/api-docs`

---

## ✅ Features Implemented

### ✨ Authentication
- [x] User registration with email verification
- [x] Secure login with JWT
- [x] Token refresh mechanism
- [x] Password hashing with bcrypt
- [x] Role-based access control (Admin/HR/Employee)

### 👤 Employee Management
- [x] View personal profile
- [x] Edit profile information
- [x] Admin can view/edit all employee details
- [x] Employee search functionality

### ⏰ Attendance Management
- [x] Check-in/Check-out system
- [x] Daily and weekly attendance views
- [x] Status tracking (Present/Absent/Half-day/Leave)
- [x] Attendance history for employees
- [x] Admin view all employee attendance

### 📅 Leave Management
- [x] Apply for leave (Paid/Sick/Unpaid/Maternity/Paternity)
- [x] Leave balance tracking
- [x] Admin approval/rejection workflow
- [x] Leave status notifications
- [x] Remarks and comments system

### 💰 Payroll Management
- [x] View salary information
- [x] Payroll history by month
- [x] Calculate net salary (Basic + Allowances - Deductions)
- [x] Admin payroll management
- [x] Payroll analytics

### 🔒 Security Features
- [x] JWT authentication
- [x] Password hashing (bcryptjs)
- [x] CORS protection
- [x] Rate limiting
- [x] Input validation with Joi
- [x] Helmet for HTTP headers
- [x] MongoDB injection prevention

### 📊 Admin Dashboard
- [x] Employee list management
- [x] Leave approval interface
- [x] Attendance monitoring
- [x] Payroll management
- [x] Analytics and reports

### 🧪 Testing
- [x] Unit tests (Jest)
- [x] Integration tests
- [x] API endpoint tests (Supertest)
- [x] Frontend component tests (React Testing Library)
- [x] Test coverage reports

### 📚 Documentation
- [x] Swagger/OpenAPI documentation
- [x] API endpoint documentation
- [x] Setup guide
- [x] Contributing guidelines
- [x] Code comments

---

## 🧪 Running Tests

```bash
# Backend tests
cd backend
npm test
npm run test:coverage
npm run test:watch

# Frontend tests
cd frontend
npm test
npm run test:coverage
npm run test:watch
```

---

## 📦 Build & Deploy

### Production Build

```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
npm start
```

### Docker Deployment

```bash
docker-compose -f docker-compose.yml up -d
```

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/signup | Register user |
| POST | /api/auth/signin | Login user |
| GET | /api/employees | Get all employees |
| GET | /api/employees/profile/me | Get my profile |
| POST | /api/attendance/check-in | Check in |
| GET | /api/attendance/my-attendance | Get my attendance |
| POST | /api/leaves/apply | Apply for leave |
| GET | /api/leaves/balance | Get leave balance |
| GET | /api/payroll/my-payroll | Get my payroll |

Full API docs available at: `http://localhost:5000/api-docs`

---

## 📁 Project Structure

```
human_resource_management_system/
├── backend/
│   ├── src/
│   │   ├── config/        # DB & JWT config
│   │   ├── models/        # MongoDB schemas
│   │   ├── controllers/   # Route handlers
│   │   ├── services/      # Business logic
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Auth & error handling
│   │   └── utils/         # Helpers & validation
│   ├── tests/             # Test files
│   └── Dockerfile
│
├── frontend/
│   ├── app/               # Pages
│   ├── components/        # React components
│   ├── lib/               # API & store
│   ├── styles/            # CSS files
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md
```

---

## 🔐 Default Admin Account

Email: `admin@human_resource_management_system.local`  
Password: `Admin@123`

(Create via signup with role: admin)

---

## 📞 Need Help?

- Check [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed setup
- Review [README.md](README.md) for complete documentation
- Check API docs at `/api-docs` when server is running
- See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines

---

## ✨ Ready to Use!

Your complete HRMS application is ready for:
- ✅ Development
- ✅ Testing
- ✅ Deployment
- ✅ Production use

**Happy coding! 🚀**
