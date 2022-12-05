import React, { useContext } from 'react';
import Scrollbar from 'src/components/Scrollbar';
import { SidebarContext } from 'src/contexts/SidebarContext';

import { Box, Drawer, styled, Divider, useTheme, darken } from '@mui/material';

import SidebarMenu from './SidebarMenu';
import Logo from 'src/components/LogoSign';
import useWindowSize from 'src/hooks/useWindowSize';

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
    min-width: ${theme.sidebar.width};
    color: ${theme.colors.alpha.trueWhite[70]};
    position: relative;
    z-index: 7;
    height: 100%;
    padding-bottom: 68px;
`
);

const Sidebar = () => {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();
  const theme = useTheme();
  const { isMobile } = useWindowSize();

  return (
    <>
      <Drawer
        sx={{
          width: isMobile ? '100%' : theme.sidebar.width,
          boxShadow: `${theme.sidebar.boxShadow}`,
          ...(sidebarToggle ? { width: theme.sidebar.width } : { width: 0 }),
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isMobile ? '100%' : theme.sidebar.width,
            boxSizing: 'border-box'
          }
        }}
        open={sidebarToggle}
        onClose={closeSidebar}
        elevation={9}
        variant="persistent"
        anchor="left"
      >
        <SidebarWrapper
          sx={{
            width: isMobile ? '100%' : theme.sidebar.width,
            background:
              theme.palette.mode === 'dark'
                ? theme.colors.alpha.black[100]
                : theme.colors.alpha.white[50]
          }}
        >
          <Scrollbar>
            <Box mt={1} mx={'auto'} sx={{ width: '50%' }}>
              <Box>
                <Logo />
              </Box>
            </Box>
            <Divider
              sx={{
                mt: theme.spacing(1),
                height: 2,
                background: darken(theme.colors.alpha.black[10], 0.15)
              }}
            />
            <SidebarMenu />
          </Scrollbar>
        </SidebarWrapper>
      </Drawer>
    </>
  );
};

export default Sidebar;
