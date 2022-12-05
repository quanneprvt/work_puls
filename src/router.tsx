import React, { Suspense, lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import SidebarLayout from 'src/layouts/SidebarLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Dashboards
const Dashboard = Loader(lazy(() => import('src/content/dashboard')));

const ProjectTracking = Loader(
  lazy(() => import('src/content/project_tracking'))
);

const DesignSystem = Loader(
  lazy(() => import('src/content/project_tracking/design_system'))
);

export const PathTranslator = [
  { path: 'projecttrack', name: 'Project Track' },
  { path: 'designsystem', name: 'Design System' },
  { path: 'dashboard', name: 'Dashboard' }
];

const routes: RouteObject[] = [
  {
    path: '',
    element: <SidebarLayout />,
    children: [
      {
        path: '404',
        element: <Navigate to="404" replace />
      },
      {
        path: '/projecttrack',
        element: <ProjectTracking />,
        children: [
          {
            index: true,
            element: <Navigate to="/projecttrack/designsystem" replace />
          },
          {
            path: 'designsystem',
            element: <DesignSystem />
          }
        ]
      },
      {
        index: true,
        element: <Navigate to="/dashboard" replace />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      }
    ]
  }
];

export default routes;
