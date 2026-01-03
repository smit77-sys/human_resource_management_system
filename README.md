# Human Resource Management System (HRMS)

## 🎯 Project Overview

**Human Resource Management System (HRMS)** is a comprehensive platform designed to digitize and streamline core HR operations including employee onboarding, profile management, attendance tracking, leave management, payroll visibility, and approval workflows.

**Tagline:** Every workday, perfectly aligned.

### Key Features

✅ **Secure Authentication** - Sign up/sign in with email verification  
✅ **Role-Based Access** - Admin/HR and Employee roles  
✅ **Employee Profile Management** - View and edit personal/job details  
✅ **Attendance Tracking** - Daily/weekly attendance views with check-in/check-out  
✅ **Leave Management** - Apply for leave, admin approval workflows  
✅ **Payroll Management** - Salary structure and payroll visibility  
✅ **Approval Workflows** - HR/Admin approval system  
✅ **Responsive Dashboard** - Quick-access cards and alerts  

---

## 🏗️ Project Structure

```
human_resource_management_system/
├── backend/                    # Express.js API server
│   ├── src/
│   │   ├── config/            # Configuration files
│   │   ├── controllers/       # Route controllers
│   │   ├── models/            # MongoDB schemas
│   │   ├── routes/            # API routes
│   │   ├── middleware/        # Custom middleware
│   │   ├── services/          # Business logic
│   │   ├── utils/             # Utility functions
│   │   └── app.ts             # Express app setup
│   ├── tests/                 # Test files
│   ├── .env.example           # Environment variables template
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                   # React/Next.js frontend
│   ├── app/                   # App pages
│   ├── components/            # React components
│   ├── lib/                   # Utility libraries
│   ├── public/                # Static assets
│   ├── styles/                # Global styles
│   ├── __tests__/             # Test files
│   ├── .env.local.example     # Environment variables template
│   ├── package.json
│   └── tsconfig.json
│
├── .github/
│   └── workflows/             # CI/CD pipelines
│
├── .gitignore
├── docker-compose.yml
├── Dockerfile (backend)
├── README.md
└── CONTRIBUTING.md
```

---

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **Validation:** Joi
- **Testing:** Jest, Supertest
- **Documentation:** Swagger/OpenAPI

### Frontend
- **Framework:** React 18+ / Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context/Zustand
- **Testing:** Jest, React Testing Library
- **HTTP Client:** Axios

---

## 📋 Installation & Setup

### Prerequisites
- **Node.js** v18+
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your MongoDB URI and JWT secret
# MONGODB_URI=mongodb://localhost:27017/human_resource_management_system
# JWT_SECRET=your_secret_key_here

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.local.example .env.local

# Update .env.local with backend URL
# NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

---

## 🚀 Running the Application

### Development Environment

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Access the application at: `http://localhost:3000`

### Production Environment

```bash
# Build both backend and frontend
cd backend && npm run build
cd ../frontend && npm run build

# Run production servers
cd backend && npm start
cd ../frontend && npm start
```

### Docker (Optional)

```bash
# Build and run with Docker Compose
docker-compose up -d

# Access the application at http://localhost:3000
```

---

## 🧪 Testing

### Backend Tests

# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch
```

### Frontend Tests

# MONGODB_URI=mongodb://localhost:27017/human_resource_management_system
cd frontend

# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch
```

---
## 📚 API Documentation

Once the backend is running, visit:
- **Swagger UI:** `http://localhost:5000/api-docs`


#### Authentication
- `POST /api/auth/signup` - Register new user

- `GET /api/employees` - Get all employees (Admin only)
- `GET /api/employees/:id` - Get employee details
- `PUT /api/employees/:id` - Update employee profile
#### Attendance
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance/check-in` - Check in
- `POST /api/attendance/check-out` - Check out
- `GET /api/attendance/:employeeId` - Get employee attendance

#### Leave
- `GET /api/leaves` - Get leave requests
- `POST /api/leaves` - Apply for leave
- `PUT /api/leaves/:id/approve` - Approve leave (Admin only)
- `PUT /api/leaves/:id/reject` - Reject leave (Admin only)

#### Payroll
- `GET /api/payroll` - Get payroll records
- `GET /api/payroll/:employeeId` - Get employee payroll
- `PUT /api/payroll/:employeeId` - Update payroll (Admin only)

---

## 👥 User Roles & Permissions

### Admin / HR Officer
- ✅ Manage employees
- ✅ Approve/reject leave requests
- ✅ View all attendance records
- ✅ Manage payroll and salary structure
- ✅ View all reports and analytics

### Employee
- ✅ View own profile
- ✅ View own attendance
- ✅ Apply for leave
- ✅ View own payroll details (read-only)
- ✅ Update limited profile fields

---

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt for password security
- **Email Verification** - Confirm user email during signup
- **Rate Limiting** - Prevent brute force attacks
- **CORS Protection** - Configured CORS policies
- **Input Validation** - Server-side validation with Joi
- **MongoDB Injection Prevention** - Parameterized queries
- **XSS Protection** - React/Next.js built-in protection

---

## 📊 Future Enhancements

- 📧 Email & SMS notifications
- 📈 Advanced analytics & reports dashboard
- 💰 Automated salary slip generation
- 🔔 Real-time notifications
- 📱 Mobile app (React Native/Flutter)
- 🌐 Multi-language support
- 🎯 Performance reviews module
- 📅 Shift management
- 🚗 Travel & expense management

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** - see [LICENSE](LICENSE) file for details.

---

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature request? Open an issue on GitHub (update with your repository URL).

---

## 📧 Contact & Support

- **Email:** support@human_resource_management_system.local
- **Discord:** [Join our community](https://discord.gg/human_resource_management_system)

---

## ✨ Acknowledgments

This project is built with love using modern web technologies. Special thanks to all contributors and the open-source community.

---

**Last Updated:** January 2026  
**Version:** 1.0.0
