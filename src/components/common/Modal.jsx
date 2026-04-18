import { useState } from 'react';
import Button from './Button';

const Modal = ({ isOpen, title, onClose, onSubmit, children, submitLabel = 'Save' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-auto p-4 sm:p-6 animate-fadeIn max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-black mb-4">{title}</h2>
        <div className="mb-6 text-black">{children}</div>
        <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end">
          <Button variant="ghost" onClick={onClose} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button onClick={onSubmit} className="w-full sm:w-auto">{submitLabel}</Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
