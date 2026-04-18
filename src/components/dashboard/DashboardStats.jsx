import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BarChart3, ListTodo, CheckCircle2, Clock } from 'lucide-react';
import Card from '../common/Card';

const StatCard = ({ icon: Icon, label, value, color }) => {
  return (
    <Card className="flex items-center gap-4">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-gray-600 text-sm font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </Card>
  );
};

const DashboardStats = () => {
  const { items: projects } = useSelector(state => state.projects);
  const { items: tasks } = useSelector(state => state.tasks);

  const stats = useMemo(() => {
    const totalProjects = projects.length;
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const pendingTasks = tasks.filter(t => t.status === 'pending').length;

    return {
      totalProjects,
      totalTasks,
      completedTasks,
      pendingTasks,
    };
  }, [projects, tasks]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        icon={BarChart3}
        label="Total Projects"
        value={stats.totalProjects}
        color="bg-primary-600"
      />
      <StatCard
        icon={ListTodo}
        label="Total Tasks"
        value={stats.totalTasks}
        color="bg-secondary-600"
      />
      <StatCard
        icon={CheckCircle2}
        label="Completed Tasks"
        value={stats.completedTasks}
        color="bg-green-600"
      />
      <StatCard
        icon={Clock}
        label="Pending Tasks"
        value={stats.pendingTasks}
        color="bg-yellow-600"
      />
    </div>
  );
};

export default DashboardStats;
