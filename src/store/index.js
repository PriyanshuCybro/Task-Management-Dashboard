import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './slices/projectsSlice';
import tasksReducer from './slices/tasksSlice';
import uiReducer from './slices/uiSlice';
import { saveStateToLocalStorage, loadStateFromLocalStorage } from './localStorage';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    tasks: tasksReducer,
    ui: uiReducer,
  },
});

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});

export default store;
