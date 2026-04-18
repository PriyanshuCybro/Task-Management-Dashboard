import { useState } from 'react';
import ProjectList from '../components/projects/ProjectList';
import ProjectForm from '../components/projects/ProjectForm';

const ProjectsPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Projects</h1>
        <p className="text-gray-600">Manage and organize all your projects in one place</p>
      </div>

      <ProjectList
        onAddProject={() => {
          setSelectedProject(null);
          setIsFormOpen(true);
        }}
        onEditProject={handleEditProject}
      />

      <ProjectForm
        isOpen={isFormOpen}
        project={selectedProject}
        onClose={handleCloseForm}
      />
    </div>
  );
};

export default ProjectsPage;
