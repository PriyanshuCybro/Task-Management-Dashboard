import { useState } from 'react';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';

const TasksPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tasks</h1>
        <p className="text-gray-600">Track and manage all your tasks effectively</p>
      </div>

      <TaskList
        onAddTask={() => {
          setSelectedTask(null);
          setIsFormOpen(true);
        }}
        onEditTask={handleEditTask}
      />

      <TaskForm
        isOpen={isFormOpen}
        task={selectedTask}
        onClose={handleCloseForm}
      />
    </div>
  );
};

export default TasksPage;
