// Redux localStorage middleware for persistence
const STORAGE_KEY = 'taskhub_state';

export const saveStateToLocalStorage = (state) => {
  try {
    const stateToPersist = {
      projects: state.projects.items,
      tasks: state.tasks.items,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToPersist));
  } catch (error) {
    console.error('Error saving state to localStorage:', error);
  }
};

export const loadStateFromLocalStorage = () => {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    return savedState ? JSON.parse(savedState) : null;
  } catch (error) {
    console.error('Error loading state from localStorage:', error);
    return null;
  }
};
