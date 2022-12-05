import React, { useCallback, useContext, useEffect, useState } from 'react';

import { Box, List, styled, Button, ListItem } from '@mui/material';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import WorkIcon from '@mui/icons-material/Work';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ScreenshotMonitorIcon from '@mui/icons-material/ScreenshotMonitor';
import SettingsIcon from '@mui/icons-material/Settings';
import useWindowSize from 'src/hooks/useWindowSize';
import { SidebarContext } from 'src/contexts/SidebarContext';

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

  .MuiList-root > .MuiListItem-root:hover {
    background-color: ${theme.colors.primary.lighter};
  }

  .MuiList-root > .MuiListItem-root > .MuiButtonBase-root {
    padding: 10px 20px;
    font-weight: 600;
    font-size: ${theme.typography.pxToRem(12)};
    color: ${theme.colors.alpha.black[70]};
    line-height: 1.4;
    width: 100%;
    justify-content: flex-start;
  }
  .MuiList-root > .MuiListItem-root > .MuiButtonBase-root:hover {
    background: transparent;
  }

  .MuiList-root > .MuiListItem-root.selected {
    background-color: ${theme.colors.primary.lighter};
  }
  .MuiList-root > .MuiListItem-root.selected > .MuiButtonBase-root {
    font-weight: bold;
    color: ${theme.colors.alpha.black[100]};
  }
  .MuiList-root > .MuiListItem-root.selected > .MuiButtonBase-root > span{
    color: ${theme.colors.primary.main};
  }
`
);

export interface SideBarItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  href?: string;
}

export const items: SideBarItem[] = [
  {
    label: 'Dashboard',
    value: 'dashboard',
    icon: <CalendarMonthIcon />,
    href: '/dashboard'
  },
  {
    label: 'Real-time Tracking',
    icon: <AccessTimeIcon />,
    value: 'tracking',
    href: '/tracking'
  },
  {
    label: 'Screenshots',
    icon: <InsertPhotoIcon />,
    value: 'screenshots',
    href: '/screenshot'
  },
  {
    label: 'Employees',
    icon: <PeopleAltIcon />,
    value: 'employees',
    href: '/employees'
  },
  {
    label: 'Projects Tracking',
    icon: <WorkIcon />,
    value: 'projectstracking',
    href: '/projecttrack'
  },
  {
    label: 'Teams',
    icon: <PersonAddIcon />,
    value: 'teams',
    href: '/teams'
  },
  {
    label: 'Time and Adttendance',
    icon: <CalendarTodayIcon />,
    value: 'timeandattendance',
    href: '/timeandattendance'
  },
  {
    label: 'Apps and Websites',
    icon: <ScreenshotMonitorIcon />,
    value: 'appandwebsites',
    href: '/appandwebsites'
  },
  {
    label: 'Settings',
    icon: <SettingsIcon />,
    value: 'setting',
    href: '/setting'
  }
];

const SidebarMenu = () => {
  const [selectedItem, setSelectedItem] = useState<SideBarItem>(items[0]);
  const { isMobile } = useWindowSize();
  const { closeSidebar } = useContext(SidebarContext);
  const location = useLocation();

  const setSelectItem = useCallback(
    (item: SideBarItem) => {
      isMobile && closeSidebar();
      setSelectedItem(item);
    },
    [closeSidebar, isMobile]
  );

  useEffect(() => {
    const path = location.pathname.split('/');
    path.splice(0, 1);
    const selectedItem = items.find((item) => item.href.includes(path[0]));
    selectedItem && setSelectedItem(selectedItem);
  }, [location.pathname]);

  return (
    <>
      <MenuWrapper>
        <List component="div">
          {items.map((item) => {
            return (
              <ListItem
                component="div"
                key={item.value}
                className={selectedItem.value === item.value ? 'selected' : ''}
              >
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={() => setSelectItem(item)}
                  to={item.href}
                  startIcon={item.icon}
                >
                  {item.label}
                </Button>
              </ListItem>
            );
          })}
        </List>
      </MenuWrapper>
    </>
  );
};

export default SidebarMenu;
