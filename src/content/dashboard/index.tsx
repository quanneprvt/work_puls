import React, { Helmet } from 'react-helmet-async';
import { Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Typography>Readme</Typography>
      <Typography>
        {
          "Please don't use other page as it is just to make the right design, it has no use"
        }
      </Typography>
      <Typography>
        {'Please navigate to Project Tracking page for task completement'}
      </Typography>
    </>
  );
};

export default Dashboard;
