import React, { useCallback, useContext, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  darken,
  Divider,
  Grid,
  useTheme
} from '@mui/material';
import StatusCardContainer from './components/StatusCardContainer';
import { Task, TaskStatus } from 'src/models/task';
import data from '../../../data/tasks.json';
import { PopupContext } from 'src/contexts/PopupContext';

const Tasks = () => {
  const theme = useTheme();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const { openPopup } = useContext(PopupContext);
  const [tasks, setTasks] = useState<Task[]>(data as Task[]);

  const addNewTask = useCallback((data: Task) => {
    setTasks((cur) => [
      ...cur,
      {
        id: Math.random().toString(),
        name: data.name,
        status: data.status,
        priority: data.priority,
        assignees: data.assignees,
        timer: 0
      }
    ]);
  }, []);

  const updateTaskStatus = useCallback((id: string, status: TaskStatus) => {
    setTasks((cur) => {
      const taskIndex = cur.findIndex((task) => task.id === id);
      const result = [...cur];
      result[taskIndex] = { ...result[taskIndex], status };
      return result;
    });
  }, []);

  const updateTask = useCallback((data: Task) => {
    console.warn(data);
    setTasks((cur) => {
      const taskIndex = cur.findIndex((task) => task.id === data.id);
      const result = [...cur];
      result[taskIndex] = { ...result[taskIndex], ...data };
      return result;
    });
  }, []);

  return (
    <Card>
      <CardHeader
        title={
          <Box>
            Tasks{' '}
            <Box component={'span'}>
              <Button
                variant="outlined"
                sx={{
                  fontWeight: 'bold',
                  color: darken(theme.colors.primary.main, 0.15),
                  border: `2px solid ${theme.colors.primary.main}`,
                  marginLeft: 5
                }}
                onClick={() => openPopup('createTask', {}, addNewTask)}
              >
                Add New Task
              </Button>
            </Box>
          </Box>
        }
      />
      <Divider sx={{ height: 2 }} />
      <CardContent sx={{ padding: 1, paddingBottom: '9px !important' }}>
        <Grid container columns={12} spacing={1}>
          {Object.keys(TaskStatus).map((status) => {
            return (
              <Grid
                item
                xl={3}
                lg={3}
                md={4}
                sm={6}
                xs={12}
                key={TaskStatus[status]}
              >
                <StatusCardContainer
                  items={
                    tasks.filter(
                      (item) => item.status === TaskStatus[status]
                    ) as Task[]
                  }
                  status={TaskStatus[status]}
                  addTask={addNewTask}
                  updateTaskStatus={updateTaskStatus}
                  onTaskEdit={updateTask}
                  isDragging={isDragging}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={() => setIsDragging(false)}
                />
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Tasks;
