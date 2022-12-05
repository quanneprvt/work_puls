import React, { useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import {
  Box,
  IconButton,
  Tooltip,
  styled,
  Link,
  Typography,
  Breadcrumbs,
  useTheme,
  Theme
} from '@mui/material';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { SidebarContext } from 'src/contexts/SidebarContext';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { PathTranslator } from 'src/router';

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        right: 0;
        z-index: 6;
        backdrop-filter: blur(3px);
        position: sticky;
        justify-content: space-between;
        width: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            left: ${theme.sidebar.width};
            width: auto;
        }
`
);

const breadcrumbsStyles = (theme: Theme) => ({
  color: theme.colors.alpha.black[70],
  fontWeight: 500
});

const Header = () => {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const location = useLocation();
  const theme = useTheme();

  const breadcrumbs = useMemo(() => {
    const paths = location.pathname.split('/');
    paths.splice(0, 1);
    return paths.map((path, index) => {
      const pathTanslate = PathTranslator.find((translate) =>
        path.includes(translate.path)
      )?.name;
      return index === paths.length - 1 ? (
        <Typography
          sx={{ ...breadcrumbsStyles(theme), fontWeight: 'bold' }}
          key={path}
        >
          {pathTanslate || path}
        </Typography>
      ) : (
        <Link sx={breadcrumbsStyles(theme)} key={path}>
          {pathTanslate || path}
        </Link>
      );
    });
  }, [location, theme]);

  const currentPathName = useMemo(() => {
    const paths = location.pathname.split('/');
    const currentPath = paths[paths.length - 1];
    return (
      PathTranslator.find((translate) => currentPath.includes(translate.path))
        ?.name || currentPath
    );
  }, [location.pathname]);

  return (
    <HeaderWrapper display="flex" alignItems="flex-start">
      <Box display={'flex'} flexDirection={'column'}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
        <Box my={1.5} fontWeight={'bold'} fontSize={20}>
          {currentPathName}
        </Box>
      </Box>
      <Box display="flex" alignItems="center" ml={'auto'}>
        <Box
          component="span"
          sx={{
            display: { lg: 'none', xs: 'inline-block' }
          }}
        >
          <Tooltip arrow title="Toggle Menu">
            <IconButton color="primary" onClick={toggleSidebar}>
              {!sidebarToggle ? (
                <MenuTwoToneIcon fontSize="small" />
              ) : (
                <CloseTwoToneIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </HeaderWrapper>
  );
};

export default Header;
