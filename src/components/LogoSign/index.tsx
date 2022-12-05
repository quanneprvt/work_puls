import React, { styled } from '@mui/material';
import { Link } from 'react-router-dom';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        display: flex;
        text-decoration: none;
        margin: 0 auto;
        font-weight: ${theme.typography.fontWeightBold};
`
);

const LogoImage = styled('img')(() => {
  return {
    width: '100%'
  };
});

const Logo = () => {
  return (
    <LogoWrapper to="/overview">
      <LogoImage src={'/logo.png'} />
    </LogoWrapper>
  );
};

export default Logo;
