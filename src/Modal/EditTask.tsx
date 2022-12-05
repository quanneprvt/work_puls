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
import { Priority, Task, TaskStatus } from '../models/task';
import { PopupContext, PopupProps } from '../contexts/PopupContext';

interface EditTaskModalProps {
  popupProps: PopupProps;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ popupProps }) => {
  const theme = useTheme();
  const { closePopup } = useContext(PopupContext);
  const formRef = useRef(null);
  const initialData = popupProps?.props as Task | undefined;

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

  const onEditTask = useCallback(() => {
    const data = {
      id: initialData?.id,
      name: formRef.current.taskName.value,
      assignees: formRef.current.assignees.value.split(','),
      priority: formRef.current.priority.value,
      status: formRef.current.status.value
    };
    if (popupProps?.onConfirm) popupProps?.onConfirm(data);
    closePopup('editTask');
  }, [closePopup, initialData?.id, popupProps]);

  return (
    <Modal
      open={Boolean(popupProps?.open)}
      onClose={popupProps?.onCancel || (() => closePopup('editTask'))}
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
          Edit Task
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
              defaultValue={initialData?.name}
            />
            <TextField
              id="filled-basic"
              label="Asignees"
              variant="outlined"
              name={'assignees'}
              defaultValue={initialData?.assignees}
            />
            <FormControl>
              <InputLabel id="priority-label">Priority</InputLabel>
              <Select
                labelId="priority-label"
                id="priority-standard"
                label="Priority"
                name="priority"
                defaultValue={initialData?.priority as Priority}
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
          <Button variant="contained" onClick={onEditTask}>
            Confirm
          </Button>
          <Button
            variant="outlined"
            sx={{ marginLeft: 1 }}
            onClick={popupProps?.onCancel || (() => closePopup('editTask'))}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditTaskModal;
