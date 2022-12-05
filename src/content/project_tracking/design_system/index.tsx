import React from 'react';
import { Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import HighLight from './HighLight';
import Tasks from './Tasks';

const ProjectTracking = () => {
  return (
    <>
      <Helmet>
        <title>Design System</title>
      </Helmet>
      <Box display={'flex'} gap={2} fontSize={11}>
        <Box color={'#3f8f73'} fontWeight={'bold'}>
          Active Project
        </Box>
        <Box>4 assignees</Box>
        <Box>
          Budget:{' '}
          <Box component={'span'} fontWeight={'bold'}>
            32 hours
          </Box>
        </Box>
      </Box>
      <HighLight />
      <Tasks />
    </>
  );
};

export default ProjectTracking;
