import React from 'react';
import { Box, IconButton, Grid } from '@mui/material';
import InfoCard from './components/InfoCard';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TimelineIcon from '@mui/icons-material/Timeline';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const HighLight = () => {
  return (
    <Grid my={3} columns={12} container spacing={2}>
      <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
        <InfoCard
          title="Total time on Project"
          titleIcon={
            <IconButton aria-label="settings">
              <WorkOutlineIcon />
            </IconButton>
          }
          info={
            <Box component={'span'} fontWeight={'bold'} fontSize={20}>
              03:39 <sup>h</sup>
            </Box>
          }
        />
      </Grid>
      <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
        <InfoCard
          title="Earnings"
          titleIcon={
            <IconButton aria-label="settings">
              <LocalAtmIcon />
            </IconButton>
          }
          info={
            <Box component={'span'} fontWeight={'bold'} fontSize={20}>
              <sup>$</sup> 2409.20
            </Box>
          }
        />
      </Grid>
      <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
        <InfoCard
          title="Costs"
          titleIcon={
            <IconButton aria-label="settings">
              <AccountBalanceWalletIcon />
            </IconButton>
          }
          info={
            <Box component={'span'} fontWeight={'bold'} fontSize={20}>
              <sup>$</sup> 1260.14
            </Box>
          }
        />
      </Grid>
      <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
        <InfoCard
          title="Productivity"
          titleColor={'#5495e4'}
          titleIcon={
            <Box color={'#5495e4'}>
              <IconButton aria-label="settings" color="inherit">
                <TimelineIcon />
              </IconButton>
            </Box>
          }
          info={
            <>
              <Box component={'span'} fontWeight={'bold'} fontSize={20}>
                93.57 <sup>%</sup>
              </Box>
              {'  '}
              <Box
                component={'span'}
                fontWeight={'bold'}
                fontSize={10}
                color={'#3f8f73'}
              >
                <ArrowDropUpIcon sx={{ transform: 'translateY(10px)' }} />
                2.37%
              </Box>
            </>
          }
        />
      </Grid>
    </Grid>
  );
};

export default HighLight;
