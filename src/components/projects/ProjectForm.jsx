import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProject, updateProject, deleteProject } from '../../store/slices/projectsSlice';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { PROJECT_STATUS } from '../../constants';

const ProjectForm = ({ isOpen, project, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(
    project || {
      name: '',
      description: '',
      status: 'active',
    }
  );
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Project name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (project) {
      dispatch(updateProject({ ...project, ...formData }));
    } else {
      dispatch(addProject(formData));
    }
    onClose();
  };

  const handleDelete = () => {
    if (project && window.confirm('Are you sure you want to delete this project?')) {
      dispatch(deleteProject(project.id));
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title={project ? 'Edit Project' : 'New Project'}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitLabel={project ? 'Update' : 'Create'}
    >
      <div className="space-y-4">
        <Input
          label="Project Name"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
          required
        />
        <Input
          label="Description"
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          error={errors.description}
          required
        />
        <Select
          label="Status"
          value={formData.status}
          onChange={e => setFormData({ ...formData, status: e.target.value })}
          options={[
            { label: 'Active', value: 'active' },
            { label: 'Completed', value: 'completed' },
          ]}
        />
      </div>
      {project && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <Button
            variant="danger"
            className="w-full"
            onClick={handleDelete}
          >
            🗑️ Delete Project
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default ProjectForm;
