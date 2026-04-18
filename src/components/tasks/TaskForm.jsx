import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask, deleteTask } from '../../store/slices/tasksSlice';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { USERS } from '../../constants';

const TaskForm = ({ isOpen, task, onClose }) => {
  const dispatch = useDispatch();
  const { items: projects } = useSelector(state => state.projects);

  const [formData, setFormData] = useState(
    task || {
      projectId: projects[0]?.id || '',
      title: '',
      status: 'pending',
      assignedTo: '',
      dueDate: '',
      priority: 'medium',
    }
  );
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Task title is required';
    if (!formData.projectId) newErrors.projectId = 'Project is required';
    if (!formData.assignedTo) newErrors.assignedTo = 'Assigned user is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (task) {
      dispatch(updateTask({ ...task, ...formData }));
    } else {
      dispatch(addTask(formData));
    }
    onClose();
  };

  const handleDelete = () => {
    if (task && window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task.id));
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title={task ? 'Edit Task' : 'New Task'}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitLabel={task ? 'Update' : 'Create'}
    >
      <div className="space-y-4">
        <Select
          label="Project"
          value={formData.projectId}
          onChange={e => setFormData({ ...formData, projectId: parseInt(e.target.value) })}
          error={errors.projectId}
          required
          options={projects.map(p => ({ label: p.name, value: p.id }))}
        />
        <Input
          label="Task Title"
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          error={errors.title}
          required
        />
        <Select
          label="Assigned To"
          value={formData.assignedTo}
          onChange={e => setFormData({ ...formData, assignedTo: e.target.value })}
          error={errors.assignedTo}
          required
          options={USERS.map(user => ({ label: user, value: user }))}
        />
        <Input
          label="Due Date"
          type="date"
          value={formData.dueDate}
          onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
          error={errors.dueDate}
          required
        />
        <Select
          label="Priority"
          value={formData.priority}
          onChange={e => setFormData({ ...formData, priority: e.target.value })}
          options={[
            { label: 'Low', value: 'low' },
            { label: 'Medium', value: 'medium' },
            { label: 'High', value: 'high' },
          ]}
        />
        <Select
          label="Status"
          value={formData.status}
          onChange={e => setFormData({ ...formData, status: e.target.value })}
          options={[
            { label: 'Pending', value: 'pending' },
            { label: 'Completed', value: 'completed' },
          ]}
        />
      </div>
      {task && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <Button
            variant="danger"
            className="w-full"
            onClick={handleDelete}
          >
            🗑️ Delete Task
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default TaskForm;
