import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Plus, Edit2 } from 'lucide-react';
import { setSearchTerm, setFilterStatus, setCurrentPage } from '../../store/slices/tasksSlice';
import Input from '../common/Input';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { formatDate, filterItems } from '../../utils/helpers';

const TaskRow = ({ task, onEdit, onToggle }) => {
  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="px-4 sm:px-6 py-4">
        <input
          type="checkbox"
          checked={task.status === 'completed'}
          onChange={() => onToggle(task.id)}
          className="w-4 h-4 cursor-pointer rounded border-gray-300"
        />
      </td>
      <td
        className="px-4 sm:px-6 py-4 cursor-pointer font-medium text-gray-900 hover:text-primary-600 text-sm sm:text-base"
        onClick={() => onEdit(task)}
      >
        <span className={task.status === 'completed' ? 'line-through text-gray-500' : ''}>
          {task.title}
        </span>
      </td>
      <td className="px-4 sm:px-6 py-4 hidden sm:table-cell">
        <Badge status={task.status} />
      </td>
      <td className="px-4 sm:px-6 py-4 hidden md:table-cell text-sm text-gray-600">{task.assignedTo}</td>
      <td className="px-4 sm:px-6 py-4 hidden lg:table-cell text-sm text-gray-600">{formatDate(task.dueDate)}</td>
      <td className="px-4 sm:px-6 py-4 hidden lg:table-cell text-center">
        <span
          className={`inline-block px-2 py-1 rounded text-xs font-medium ${
            task.priority === 'high'
              ? 'bg-red-100 text-red-800'
              : task.priority === 'medium'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-green-100 text-green-800'
          }`}
        >
          {task.priority}
        </span>
      </td>
      <td className="px-4 sm:px-6 py-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(task)}
          className="flex items-center gap-1"
        >
          <Edit2 className="w-4 h-4" />
          <span className="hidden sm:inline">Edit</span>
        </Button>
      </td>
    </tr>
  );
};

// Mobile Card View
const TaskCard = ({ task, onEdit, onToggle }) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition">
      <div className="flex items-start justify-between mb-3">
        <input
          type="checkbox"
          checked={task.status === 'completed'}
          onChange={() => onToggle(task.id)}
          className="w-5 h-5 cursor-pointer rounded border-gray-300 mt-1"
        />
        <Badge status={task.status} />
      </div>
      <h3
        onClick={() => onEdit(task)}
        className={`font-medium cursor-pointer mb-2 hover:text-primary-600 ${
          task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'
        }`}
      >
        {task.title}
      </h3>
      <div className="space-y-2 text-sm text-gray-600 mb-3">
        <p>👤 {task.assignedTo}</p>
        <p>📅 {formatDate(task.dueDate)}</p>
        <p>
          🎯{' '}
          <span
            className={`inline-block px-2 py-1 rounded text-xs font-medium ${
              task.priority === 'high'
                ? 'bg-red-100 text-red-800'
                : task.priority === 'medium'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-green-100 text-green-800'
            }`}
          >
            {task.priority}
          </span>
        </p>
      </div>
      <Button
        variant="primary"
        size="sm"
        onClick={() => onEdit(task)}
        className="w-full flex items-center justify-center gap-2"
      >
        <Edit2 className="w-4 h-4" />
        Edit
      </Button>
    </div>
  );
};

const TaskList = ({ onAddTask, onEditTask }) => {
  const dispatch = useDispatch();
  const { items, searchTerm, filterStatus, currentPage, itemsPerPage } = useSelector(
    state => state.tasks
  );

  const filteredTasks = filterItems(items, searchTerm, filterStatus, 'title');
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTasks = filteredTasks.slice(startIndex, startIndex + itemsPerPage);

  const handleToggleTask = (taskId) => {
    onEditTask(items.find(t => t.id === taskId));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={e => dispatch(setSearchTerm(e.target.value))}
            className="pl-10"
          />
        </div>
        <Button onClick={onAddTask} className="flex items-center justify-center gap-2 whitespace-nowrap">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Task</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {['all', 'completed', 'pending'].map(status => (
          <button
            key={status}
            onClick={() => dispatch(setFilterStatus(status))}
            className={`px-3 sm:px-4 py-2 rounded-lg font-medium whitespace-nowrap transition text-sm sm:text-base ${
              filterStatus === status
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-light overflow-hidden">
        {paginatedTasks.length > 0 ? (
          <>
            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-sm font-semibold text-gray-700 w-12">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Title
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-sm font-semibold text-gray-700 hidden sm:table-cell">
                      Status
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-sm font-semibold text-gray-700 hidden md:table-cell">
                      Assigned To
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-sm font-semibold text-gray-700 hidden lg:table-cell">
                      Due Date
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-center text-sm font-semibold text-gray-700 hidden lg:table-cell">
                      Priority
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {paginatedTasks.map(task => (
                    <TaskRow
                      key={task.id}
                      task={task}
                      onEdit={onEditTask}
                      onToggle={handleToggleTask}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="sm:hidden space-y-3 p-4">
              {paginatedTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={onEditTask}
                  onToggle={handleToggleTask}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-4 bg-gray-50 border-t gap-4 sm:gap-0">
                <p className="text-sm text-gray-600 text-center sm:text-left">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredTasks.length)} of{' '}
                  {filteredTasks.length}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => dispatch(setCurrentPage(currentPage - 1))}
                  >
                    Previous
                  </Button>
                  {/* Page indicators */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => dispatch(setCurrentPage(page))}
                        className={`w-8 h-8 rounded text-sm font-medium transition ${
                          currentPage === page
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => dispatch(setCurrentPage(currentPage + 1))}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No tasks found</p>
            <Button onClick={onAddTask}>Create First Task</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;

