import { useState } from 'react';
import DashboardStats from '../components/dashboard/DashboardStats';
import RecentTasks from '../components/dashboard/RecentTasks';
import ProjectOverview from '../components/dashboard/ProjectOverview';

const DashboardPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your project and task management hub</p>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentTasks />
        <ProjectOverview />
      </div>
    </div>
  );
};

export default DashboardPage;
