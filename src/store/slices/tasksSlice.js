import { createSlice } from '@reduxjs/toolkit';
import { loadStateFromLocalStorage } from '../localStorage';

const defaultTasks = [
  {
    id: 1,
    projectId: 1,
    title: 'Setup database schema',
    status: 'completed',
    assignedTo: 'John Doe',
    dueDate: '2024-01-20',
    priority: 'high',
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    projectId: 1,
    title: 'Design API endpoints',
    status: 'pending',
    assignedTo: 'Jane Smith',
    dueDate: '2024-01-25',
    priority: 'high',
    createdAt: '2024-01-15',
  },
  {
    id: 3,
    projectId: 1,
    title: 'Create authentication module',
    status: 'pending',
    assignedTo: 'John Doe',
    dueDate: '2024-02-05',
    priority: 'medium',
    createdAt: '2024-01-16',
  },
  {
    id: 4,
    projectId: 2,
    title: 'Setup React Native environment',
    status: 'completed',
    assignedTo: 'Jane Smith',
    dueDate: '2024-02-02',
    priority: 'high',
    createdAt: '2024-02-01',
  },
  {
    id: 5,
    projectId: 2,
    title: 'Implement navigation',
    status: 'pending',
    assignedTo: 'Mike Johnson',
    dueDate: '2024-02-15',
    priority: 'medium',
    createdAt: '2024-02-01',
  },
];

const savedState = loadStateFromLocalStorage();

const initialState = {
  items: savedState?.tasks || defaultTasks,
  searchTerm: '',
  filterStatus: 'all',
  currentPage: 1,
  itemsPerPage: 10,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        ...action.payload,
        createdAt: new Date().toISOString().split('T')[0],
      };
      state.items.push(newTask);
    },
    updateTask: (state, action) => {
      const index = state.items.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter(t => t.id !== action.payload);
    },
    toggleTaskStatus: (state, action) => {
      const task = state.items.find(t => t.id === action.payload);
      if (task) {
        task.status = task.status === 'completed' ? 'pending' : 'completed';
      }
    },
  },
});

export const {
  setSearchTerm,
  setFilterStatus,
  setCurrentPage,
  addTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
} = tasksSlice.actions;

export default tasksSlice.reducer;
