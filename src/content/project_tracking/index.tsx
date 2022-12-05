import React from 'react';
import { Outlet } from 'react-router-dom';

const ProjectTracking = () => {
  return (
    <>
      <title>Project Tracking</title>
      <Outlet />
    </>
  );
};

export default ProjectTracking;
