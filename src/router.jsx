import { createBrowserRouter, Outlet } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Layout from './components/common/Layout';
import DashboardPage from './pages/Dashboard';
import ProjectsPage from './pages/Projects';
import TasksPage from './pages/Tasks';

const Root = () => (
  <>
    <Navbar />
    <Layout>
      <Outlet />
    </Layout>
  </>
);

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '/',
          element: <DashboardPage />,
        },
        {
          path: '/projects',
          element: <ProjectsPage />,
        },
        {
          path: '/tasks',
          element: <TasksPage />,
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);
