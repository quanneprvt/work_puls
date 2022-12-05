import React from 'react';
import { Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const PageHeader = () => {
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };
  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8)
          }}
          variant="rounded"
          alt={user.name}
          src={user.avatar}
        />
      </Grid>
    </Grid>
  );
};

export default PageHeader;
