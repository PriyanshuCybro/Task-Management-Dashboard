import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { formatDate } from '../../utils/helpers';

const RecentTasks = () => {
  const { items: tasks } = useSelector(state => state.tasks);

  const recentTasks = useMemo(() => {
    return [...tasks]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [tasks]);

  return (
    <Card className="col-span-1 md:col-span-2">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Tasks</h3>
      <div className="space-y-3">
        {recentTasks.length > 0 ? (
          recentTasks.map(task => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-900">{task.title}</p>
                <p className="text-sm text-gray-500">
                  Assigned to {task.assignedTo} • Due {formatDate(task.dueDate)}
                </p>
              </div>
              <Badge status={task.status} />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">No tasks yet</p>
        )}
      </div>
    </Card>
  );
};

export default RecentTasks;
