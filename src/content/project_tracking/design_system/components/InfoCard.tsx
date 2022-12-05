import React from 'react';
import { Card, CardContent, CardHeader, Box, useTheme } from '@mui/material';

interface InfoCardProps {
  title: string;
  titleColor?: string;
  info: React.ReactNode;
  titleIcon: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  info,
  titleIcon,
  titleColor
}) => {
  const theme = useTheme();
  return (
    <Card>
      <CardHeader
        action={titleIcon}
        title={
          <Box
            component={'span'}
            fontWeight={'bold'}
            color={titleColor || theme.colors.alpha.black[70]}
            fontSize={13}
          >
            {title}
          </Box>
        }
        sx={{ paddingBottom: 0, paddingTop: 0.75 }}
      />
      <CardContent sx={{ paddingTop: 0.5, paddingBottom: '9px !important' }}>
        {info}
      </CardContent>
    </Card>
  );
};

export default InfoCard;
