import React, { useCallback, useContext, useRef } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { Priority, TaskStatus } from '../models/task';
import { PopupContext, PopupProps } from '../contexts/PopupContext';

interface CreateTaskModalProps {
  popupProps: PopupProps;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ popupProps }) => {
  const theme = useTheme();
  const { closePopup } = useContext(PopupContext);
  const formRef = useRef(null);

  const popupStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: `2px solid ${theme.colors.alpha.black[50]}`,
    boxShadow: 24,
    p: 4,
    borderRadius: 1
  };

  const onAddNewTask = useCallback(() => {
    const data = {
      name: formRef.current.taskName.value,
      assignees: formRef.current.assignees.value.split(','),
      priority: formRef.current.priority.value,
      status: formRef.current.status.value
    };
    if (popupProps?.onConfirm) popupProps?.onConfirm(data);
    closePopup('createTask');
  }, [closePopup, popupProps]);

  return (
    <Modal
      open={Boolean(popupProps?.open)}
      onClose={popupProps?.onCancel || (() => closePopup('createTask'))}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={popupStyle}>
        <Typography
          id="modal-modal-title"
          component="h1"
          fontSize={25}
          fontWeight={'bold'}
        >
          Create Task
        </Typography>
        <form ref={formRef}>
          <Box
            id="modal-modal-description"
            sx={{ mt: 2 }}
            display="flex"
            flexDirection={'column'}
            gap={2}
          >
            <TextField
              id="filled-basic"
              label="Name"
              variant="outlined"
              name="taskName"
            />
            <TextField
              id="filled-basic"
              label="Asignees"
              variant="outlined"
              name={'assignees'}
            />
            <FormControl>
              <InputLabel id="priority-label">Priority</InputLabel>
              <Select
                labelId="priority-label"
                id="priority-standard"
                label="Priority"
                name="priority"
                defaultValue={Priority.LOW}
              >
                {Object.keys(Priority).map((priority) => {
                  return (
                    <MenuItem
                      key={Priority[priority]}
                      value={Priority[priority]}
                    >
                      {priority.replace('_', '')[0].toUpperCase() +
                        priority.toLowerCase().replace('_', '').slice(1)}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status-standard"
                label="Status"
                name={'status'}
                defaultValue={
                  (popupProps?.props as any)?.status || TaskStatus.TODO
                }
                disabled={(popupProps?.props as any)?.isStatusDisabled}
              >
                {Object.keys(TaskStatus).map((status) => {
                  return (
                    <MenuItem
                      key={TaskStatus[status]}
                      value={TaskStatus[status]}
                    >
                      {status.replace('_', '')[0].toUpperCase() +
                        status.toLowerCase().replace('_', ' ').slice(1)}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </form>
        <Box marginTop={2} textAlign="right">
          <Button variant="contained" onClick={onAddNewTask}>
            Confirm
          </Button>
          <Button
            variant="outlined"
            sx={{ marginLeft: 1 }}
            onClick={popupProps?.onCancel || (() => closePopup('createTask'))}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateTaskModal;
