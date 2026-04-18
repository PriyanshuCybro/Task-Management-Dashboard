import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setError, setSuccessMessage, clearMessages } from '../store/slices/uiSlice';

export const useNotification = () => {
  const dispatch = useDispatch();
  const { error, successMessage } = useSelector(state => state.ui);

  const showError = useCallback((message) => {
    dispatch(setError(message));
    setTimeout(() => dispatch(clearMessages()), 3000);
  }, [dispatch]);

  const showSuccess = useCallback((message) => {
    dispatch(setSuccessMessage(message));
    setTimeout(() => dispatch(clearMessages()), 3000);
  }, [dispatch]);

  return { error, successMessage, showError, showSuccess };
};

export const useLocalStorage = (key, initialValue) => {
  const getValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  };

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(getValue()) : value;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  };

  return [getValue(), setValue];
};

export const useDebouncedValue = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
