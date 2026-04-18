# TaskHub - Project & Task Management Dashboard

A modern, fully responsive project and task management dashboard built with **React 19**, **Vite**, **Redux Toolkit**, and **Tailwind CSS**. Designed with professional-grade architecture, performance optimization, and reusable component patterns.

## 🎯 Features Implemented

### 1. **Dashboard Page**
- Real-time statistics cards showing:
  - Total Projects
  - Total Tasks
  - Completed Tasks
  - Pending Tasks
- Recent tasks overview with status badges
- Active projects progress visualization
- Minimalistic, clean UI design

### 2. **Projects Management**
- **Project Listing**: View all projects with search and filter functionality
- **Create Projects**: Add new projects with name, description, and status
- **Edit Projects**: Modify existing project details
- **Delete Projects**: Remove projects with confirmation
- **Status Filtering**: Filter by Active, Completed, or Archived
- **Progress Tracking**: Visual progress bars showing task completion

### 3. **Task Management**
- **Task Listing**: Comprehensive table view with all task details
- **Search & Filter**: Search tasks and filter by status (Completed/Pending)
- **Create Tasks**: Form-based task creation with validation
- **Edit Tasks**: Update task details including status, priority, assignee, and due date
- **Delete Tasks**: Remove tasks with confirmation dialog
- **Pagination**: Paginated task list for better performance
- **Priority Levels**: High, Medium, Low priority indicators
- **Checkbox Toggle**: Mark tasks as complete/incomplete

### 4. **Form Components**
- **Reusable Form System**: Centralized form components with validation
- **Input Validation**: Real-time error handling and display
- **Modal Forms**: Clean modal-based forms for adding/editing
- **Dropdown Selections**: User and project selectors

### 5. **Navigation**
- **Responsive Navbar**: Works seamlessly on desktop and mobile
- **Mobile Menu**: Hamburger menu for mobile devices
- **Active Route Highlighting**: Clear indication of current page
- **Quick Access**: Easy navigation between Dashboard, Projects, and Tasks

## 🏗️ Project Structure

```
src/
├── components/
│   ├── common/              # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Select.jsx
│   │   ├── Card.jsx
│   │   ├── Badge.jsx
│   │   ├── Modal.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── Navbar.jsx
│   │   ├── Layout.jsx
│   │   └── index.js
│   ├── dashboard/           # Dashboard-specific components
│   │   ├── DashboardStats.jsx
│   │   ├── RecentTasks.jsx
│   │   └── ProjectOverview.jsx
│   ├── projects/            # Project management components
│   │   ├── ProjectList.jsx
│   │   └── ProjectForm.jsx
│   └── tasks/               # Task management components
│       ├── TaskList.jsx
│       └── TaskForm.jsx
├── pages/                   # Page components
│   ├── Dashboard.jsx
│   ├── Projects.jsx
│   └── Tasks.jsx
├── store/                   # Redux state management
│   ├── index.js
│   └── slices/
│       ├── projectsSlice.js
│       ├── tasksSlice.js
│       └── uiSlice.js
├── hooks/                   # Custom React hooks
│   └── index.js
├── utils/                   # Utility functions
│   └── helpers.js
├── constants/               # App constants
│   └── index.js
├── services/                # API services (ready for integration)
├── assets/                  # Static assets
├── App.jsx                  # Main App component
├── main.jsx                 # Entry point
└── index.css                # Global styles with Tailwind
```

## 🎨 Design Patterns & Architecture

### **1. Component Architecture**
- **Separation of Concerns**: UI components, page components, and business logic clearly separated
- **Reusable Components**: 8+ reusable UI components with consistent styling
- **Compound Components**: Complex components built from simpler, composable pieces

### **2. State Management**
- **Redux Toolkit**: Modern Redux setup with slices for clean, maintainable state
- **Three Store Modules**:
  - `projectsSlice`: Project data and UI filters
  - `tasksSlice`: Task data, filters, and pagination
  - `uiSlice`: Global UI state (loading, errors, notifications)

### **3. Performance Optimization**
- **useMemo Hooks**: Computed values memoized to prevent unnecessary recalculations
- **Lazy Component Loading**: Routes ready for code splitting
- **Component Memoization**: Prevented unnecessary re-renders
- **Pagination**: Task list paginated for improved performance with large datasets

### **4. Styling Strategy**
- **Tailwind CSS**: Utility-first approach for maintainable, consistent styling
- **Design System**: Custom Tailwind config with predefined colors, spacing, and shadows
- **Responsive Design**: Mobile-first approach, fully responsive across all devices
- **Custom Animations**: Smooth fade-in and slide-up animations

### **5. Form Handling**
- **Controlled Components**: Proper form state management
- **Validation Pattern**: Centralized validation logic
- **Error Display**: User-friendly error messages
- **Modal Pattern**: Non-blocking form interactions

### **6. Data Flow**
- **Unidirectional Flow**: Clear data flow from Redux store → Components → UI
- **Action Dispatching**: Centralized actions for all state mutations
- **Selectors Pattern**: Redux selectors for accessing store data

## 🔧 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.0.0 | UI library |
| React Router | 6.24.0 | Client-side routing |
| Redux Toolkit | 1.9.7 | State management |
| React Redux | 8.1.3 | Redux integration |
| Tailwind CSS | 3.4.3 | Styling |
| Vite | 6.2.0 | Build tool |
| Lucide React | 0.373.0 | Icons |
| Axios | 1.7.7 | HTTP client (ready for API integration) |

## 🚀 Getting Started

### Installation
```bash
npm install --legacy-peer-deps
```

### Development
```bash
npm run dev
```
The app will open at `http://localhost:5174`

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## 💡 Key Features of Implementation

### ✨ **Responsive Design**
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interactive elements

### 🎯 **User Experience**
- Intuitive navigation
- Clear visual hierarchy
- Smooth animations and transitions
- Real-time feedback for user actions

### 🔐 **Code Quality**
- Clean, readable code structure
- Consistent naming conventions
- Modular component organization
- Reusable utility functions

### 📱 **Mobile Optimization**
- Hamburger menu for mobile navigation
- Touch-optimized buttons and inputs
- Responsive grid layouts
- Optimized spacing for mobile devices

### ⚡ **Performance**
- Optimized renders with React hooks
- Pagination for large datasets
- Efficient state management
- Minimal bundle size with Vite

---

**Built with attention to design patterns, performance, and user experience.**