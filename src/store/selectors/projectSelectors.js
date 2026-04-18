// Selector to enrich projects with real-time task counts
export const selectProjectsWithTaskCounts = (state) => {
  const { projects, tasks } = state;
  
  return projects.items.map(project => {
    const projectTasks = tasks.items.filter(task => task.projectId === project.id);
    const completedTasks = projectTasks.filter(task => task.status === 'completed').length;
    const totalTasks = projectTasks.length;
    
    return {
      ...project,
      tasks: totalTasks,
      completedTasks: completedTasks,
    };
  });
};

// Selector to get filtered and sorted projects with task counts
export const selectFilteredProjects = (state) => {
  const { searchTerm, filterStatus } = state.projects;
  const projectsWithCounts = selectProjectsWithTaskCounts(state);
  
  // Filter by search term
  let filtered = projectsWithCounts.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filter by status
  if (filterStatus !== 'all') {
    filtered = filtered.filter(project => project.status === filterStatus);
  }
  
  // Sort by name
  return filtered.sort((a, b) => a.name.localeCompare(b.name));
};
