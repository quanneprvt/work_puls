import React, { FC, useState, createContext, useEffect } from 'react';
import useWindowSize from 'src/hooks/useWindowSize';
type SidebarContext = {
  sidebarToggle: any;
  toggleSidebar: () => void;
  closeSidebar: () => void;
};

export const SidebarContext = createContext<SidebarContext>(
  {} as SidebarContext
);

export const SidebarProvider: FC = ({ children }) => {
  const [sidebarToggle, setSidebarToggle] = useState<boolean>(true);
  const { isMobile } = useWindowSize();
  const toggleSidebar = () => {
    if (isMobile) {
      if (sidebarToggle) document.body.style.overflow = 'auto';
      else document.body.style.overflow = 'hidden';
    }
    setSidebarToggle(!sidebarToggle);
  };
  const closeSidebar = () => {
    if (isMobile) document.body.style.overflow = 'auto';
    setSidebarToggle(false);
  };

  useEffect(() => {
    if (!isMobile) document.body.style.overflow = 'auto';
  }, [isMobile]);

  return (
    <SidebarContext.Provider
      value={{ sidebarToggle, toggleSidebar, closeSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
