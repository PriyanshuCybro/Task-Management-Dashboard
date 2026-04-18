export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export const calculateStats = (items, filterKey) => {
  return {
    total: items.length,
    completed: items.filter(item => item.status === 'completed').length,
    pending: items.filter(item => item.status === 'pending').length,
  };
};

export const filterItems = (items, searchTerm, filterStatus, searchKey = 'title') => {
  return items.filter(item => {
    const matchesSearch = item[searchKey]
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });
};

export const sortByName = (items, key = 'title') => {
  return [...items].sort((a, b) =>
    a[key].localeCompare(b[key])
  );
};

export const getPriorityColor = (priority) => {
  const colors = {
    high: 'text-red-600 bg-red-50',
    medium: 'text-yellow-600 bg-yellow-50',
    low: 'text-green-600 bg-green-50',
  };
  return colors[priority] || colors.low;
};

export const getStatusBadgeClass = (status) => {
  const classes = {
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    active: 'bg-blue-100 text-blue-800',
    archived: 'bg-gray-100 text-gray-800',
  };
  return classes[status] || classes.pending;
};

export const getStatusLabel = (status) => {
  const labels = {
    completed: 'Completed',
    pending: 'Pending',
    active: 'Active',
    archived: 'Archived',
  };
  return labels[status] || status;
};

export const calculateCompletionPercentage = (completed, total) => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};
