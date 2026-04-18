import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { selectProjectsWithTaskCounts } from '../../store/selectors/projectSelectors';

const ProjectOverview = () => {
  const projectsWithCounts = useSelector(selectProjectsWithTaskCounts);

  const activeProjects = useMemo(() => {
    return projectsWithCounts.filter(p => p.status === 'active').slice(0, 3);
  }, [projectsWithCounts]);

  return (
    <Card className="col-span-1 md:col-span-2">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Active Projects</h3>
      <div className="space-y-3">
        {activeProjects.length > 0 ? (
          activeProjects.map(project => (
            <div
              key={project.id}
              className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium text-gray-900">{project.name}</p>
                  <p className="text-sm text-gray-500">{project.description}</p>
                </div>
                <Badge status={project.status} />
              </div>
              <div className="flex justify-between items-center text-xs text-gray-600">
                <span>{project.completedTasks}/{project.tasks} tasks done</span>
                <div className="w-24 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-primary-600 h-full transition-all duration-300"
                    style={{
                      width: `${project.tasks ? (project.completedTasks / project.tasks) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">No active projects</p>
        )}
      </div>
    </Card>
  );
};

export default ProjectOverview;
