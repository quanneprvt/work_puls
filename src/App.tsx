import React, { useRoutes } from 'react-router-dom';
import router from 'src/router';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import { useContext } from 'react';
import { PopupContext } from './contexts/PopupContext';
import CreateTaskModal from './Modal/CreateTask';
import EditTaskModal from './Modal/EditTask';

const App = () => {
  const content = useRoutes(router);
  const { openedPopup } = useContext(PopupContext);
  const createTaskPopupProps = openedPopup.find(
    (pop) => pop.name === 'createTask'
  );
  const editTaskPopupProps = openedPopup.find((pop) => pop.name === 'editTask');

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CssBaseline />
      {content}
      <CreateTaskModal popupProps={createTaskPopupProps} />
      <EditTaskModal popupProps={editTaskPopupProps} />
    </LocalizationProvider>
  );
};
export default App;
