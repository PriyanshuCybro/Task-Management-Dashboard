import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Plus } from 'lucide-react';
import { setSearchTerm, setFilterStatus } from '../../store/slices/projectsSlice';
import { selectFilteredProjects } from '../../store/selectors/projectSelectors';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import Badge from '../common/Badge';

const ProjectCard = ({ project, onEdit }) => {
  return (
    <Card
      className="hover:shadow-lg cursor-pointer transition transform hover:scale-105"
      onClick={() => onEdit(project)}
    >
      <div className="mb-3">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{project.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
      </div>
      <div className="flex items-center justify-between mb-4">
        <Badge status={project.status} />
        <span className="text-sm font-medium text-gray-600">
          {project.completedTasks}/{project.tasks}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-primary-500 to-primary-600 h-full transition-all duration-300"
          style={{
            width: `${project.tasks ? (project.completedTasks / project.tasks) * 100 : 0}%`,
          }}
        />
      </div>
    </Card>
  );
};

const ProjectList = ({ onAddProject, onEditProject }) => {
  const dispatch = useDispatch();
  const { searchTerm, filterStatus } = useSelector(state => state.projects);
  const sortedProjects = useSelector(selectFilteredProjects);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={e => dispatch(setSearchTerm(e.target.value))}
            className="pl-10"
          />
        </div>
        <Button onClick={onAddProject} className="flex items-center gap-2 whitespace-nowrap">
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {['all', 'active', 'completed'].map(status => (
          <button
            key={status}
            onClick={() => dispatch(setFilterStatus(status))}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
              filterStatus === status
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {sortedProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={onEditProject}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No projects found</p>
          <Button onClick={onAddProject} variant="outline" className="mt-4">
            Create Your First Project
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
