/backend
│
├── /controllers
│     ├── authController.js          # Auth logic (handling requests & responses)
│     ├── taskController.js          # Task operations controller
│     ├── userController.js          # User management controller
│     └── adminController.js         # Admin-specific operations controller
│
├── /middleware
│     ├── authMiddleware.js          # JWT authentication verification
│     ├── roleMiddleware.js          # Role-based access control
│
├── /models
│     ├── User.js                   # User schema/model definition
│     └── Task.js                   # Task schema/model definition
│
│
├── /services                    # Business logic layer: complex operations and workflows
│     ├── userService.js          # User-related business logic, uses DAO
│     ├── taskService.js          # Task-related business logic, uses DAO
│     └── adminService.js         # Admin-specific logic, uses DAO
│
├── /routes
│     ├── authRoutes.js            # Login/Register routes
│     ├── userRoutes.js            # User routes
│     ├── taskRoutes.js            # Task routes
│     └── adminRoutes.js           # Admin routes
│
├── /utils
│     └── gptIntegration.js       # Utility helpers, external API integrations
│
├── config.js                    # Configuration variables (DB, API keys, etc.)
├── server.js                    # Express app setup and server start
└── /tests                      # Optional: tests for controllers, services, DAOs
      ├── user.test.js
      └── task.test.js


/frontend
│
├── /public                       # Static files (images, favicon, etc.)
│
├── /src
│   ├── /app                     # App-wide configurations
│   │   ├── store.js             # Redux store
│   │   ├── queryClient.js       # TanStack Query client
│   │   ├── App.jsx              # App entry component
│   │   └── main.jsx             # ReactDOM.createRoot
│
│   ├── /features                # Feature-based organization (domain-driven)
│   │   ├── /auth
│   │   │   ├── components/      # LoginForm, RegisterForm
│   │   │   ├── pages/           # LoginPage.jsx, RegisterPage.jsx
│   │   │   ├── authSlice.js     # Redux: auth state
│   │   │   └── authApi.js       # TanStack Query hooks: login/register/logout
│   │   │
│   │   ├── /user
│   │   │   ├── components/      # UserProfileForm, UserCard
│   │   │   ├── pages/           # ProfilePage.jsx, EditUser.jsx
│   │   │   ├── userSlice.js     # Redux: user data/settings
│   │   │   └── userApi.js       # Query hooks for getUser, updateUser
│   │   │
│   │   ├── /task
│   │   │   ├── components/      # TaskItem, TaskList
│   │   │   ├── pages/           # TaskDashboard.jsx
│   │   │   ├── taskSlice.js     # Redux: selected task, filters
│   │   │   └── taskApi.js       # CRUD hooks (getTasks, addTask, etc.)
│   │   │
│   │   └── /admin
│   │       ├── components/      # AdminPanel, StatsTable
│   │       ├── pages/           # AdminDashboard.jsx
│   │       └── adminApi.js      # Query hooks for admin actions
│
│   ├── /components              # Shared/reusable UI: Navbar, Modal, Loader
│   ├── /layouts                 # Route-based layouts (e.g., DashboardLayout)
│   ├── /hooks                   # Custom hooks (e.g., useAuthGuard, useToast)
│   ├── /utils                   # Helper functions (e.g., formatDate)
│   ├── /services
│   │   └── axios.js             # Axios instance with token handling
│   ├── /routes
│   │   └── AppRoutes.jsx        # Central route config (React Router)
│   └── /styles                  # Tailwind CSS, global styles (optional)
│
├── .env
├── tailwind.config.js
├── vite.config.js / next.config.js
└── package.json
