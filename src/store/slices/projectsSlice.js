import { createSlice } from '@reduxjs/toolkit';
import { loadStateFromLocalStorage } from '../localStorage';

const defaultProjects = [
  {
    id: 1,
    name: 'E-Commerce Platform',
    description: 'Build a complete e-commerce solution with React',
    status: 'active',
    tasks: 12,
    completedTasks: 5,
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    name: 'Mobile App',
    description: 'React Native mobile application',
    status: 'active',
    tasks: 8,
    completedTasks: 3,
    createdAt: '2024-02-01',
  },
  {
    id: 3,
    name: 'Dashboard Redesign',
    description: 'Modernize existing dashboard UI',
    status: 'completed',
    tasks: 6,
    completedTasks: 6,
    createdAt: '2024-01-01',
  },
];

const savedState = loadStateFromLocalStorage();

const initialState = {
  items: savedState?.projects || defaultProjects,
  searchTerm: '',
  filterStatus: 'all',
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
    addProject: (state, action) => {
      const newProject = {
        id: Date.now(),
        ...action.payload,
        createdAt: new Date().toISOString().split('T')[0],
        tasks: 0,
        completedTasks: 0,
      };
      state.items.push(newProject);
    },
    updateProject: (state, action) => {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    deleteProject: (state, action) => {
      state.items = state.items.filter(p => p.id !== action.payload);
    },
  },
});

export const {
  setSearchTerm,
  setFilterStatus,
  addProject,
  updateProject,
  deleteProject,
} = projectsSlice.actions;

export default projectsSlice.reducer;
