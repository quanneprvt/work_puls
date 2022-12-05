import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef
} from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  useTheme
} from '@mui/material';
import { Box } from '@mui/system';
import DetailCard from './DetailCard';
import { Priority, Task, TaskStatus } from 'src/models/task';
import { PopupContext } from 'src/contexts/PopupContext';

interface StatusCardContainerProps {
  items: Task[];
  status: string;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  isDragging?: boolean;
  addTask?: (data: Task) => void;
  updateTaskStatus?: (id: string, status: TaskStatus) => void;
  onTaskEdit?: (data: Task) => void;
}

const PriorityOrder = [Priority.HIGH, Priority.MEDIUM, Priority.LOW];

const StatusCardContainer: React.FC<StatusCardContainerProps> = ({
  items,
  status,
  isDragging,
  onDragStart,
  onDragEnd,
  addTask,
  updateTaskStatus,
  onTaskEdit
}) => {
  const theme = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);
  const { openPopup } = useContext(PopupContext);
  const statusMap = useMemo(() => {
    switch (status) {
      case TaskStatus.TODO:
        return 'To Do';
      case TaskStatus.ON_HOLD:
        return 'On Hold';
      case TaskStatus.IN_PROGRESS:
        return 'In Progress';
      case TaskStatus.DONE:
        return 'Done';
    }
  }, [status]);

  const itemsByPriority = useMemo(() => {
    return items.sort((a, b) => {
      if (PriorityOrder.indexOf(a.priority) > PriorityOrder.indexOf(b.priority))
        return 1;
      else return -1;
    });
  }, [items]);

  const onStartDrag = useCallback(() => {
    onDragStart && onDragStart();
  }, [onDragStart]);

  const onEndDrag = useCallback(() => {
    onDragEnd && onDragEnd();
  }, [onDragEnd]);

  const onDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const elms = Array.from(
        cardRef.current.children as HTMLCollectionOf<HTMLElement>
      );
      elms.forEach((elm) => (elm.style.pointerEvents = 'none'));
      if (e.currentTarget === cardRef.current)
        cardRef.current.style.backgroundColor = theme.colors.alpha.black[30];
    },
    [theme.colors.alpha.black]
  );

  const onDragLeave = useCallback(() => {
    cardRef.current.style.backgroundColor = theme.colors.alpha.black[10];
  }, [theme.colors.alpha.black]);

  const unblockElm = () => {
    const elms = Array.from(
      cardRef.current.children as HTMLCollectionOf<HTMLElement>
    );
    elms.forEach((elm) => (elm.style.pointerEvents = 'auto'));
  };

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      const data = e.dataTransfer.getData('data');
      cardRef.current.style.backgroundColor = theme.colors.alpha.black[10];
      updateTaskStatus(data, status as TaskStatus);
      onEndDrag && onEndDrag();
    },
    [onEndDrag, status, theme.colors.alpha.black, updateTaskStatus]
  );

  useEffect(() => {
    if (!isDragging) {
      unblockElm();
    }
  }, [isDragging]);

  return (
    <Card
      ref={cardRef}
      sx={{
        backgroundColor: theme.colors.alpha.black[10],
        ...(isDragging && {
          border: `1px dashed ${theme.colors.alpha.black[70]}`
        }),
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onDragEnd={() => unblockElm()}
    >
      <CardHeader
        title={
          <Box
            component={'span'}
            sx={{ fontWeight: '700', color: theme.colors.alpha.black[50] }}
            fontSize={12}
          >
            {statusMap}
          </Box>
        }
        sx={{ paddingTop: 1 }}
      />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {itemsByPriority.map((item) => {
          return (
            <DetailCard
              key={item.id}
              id={item.id}
              name={item.name}
              timer={item.timer}
              assignees={item.assignees}
              priority={item.priority as Priority}
              status={item.status as TaskStatus}
              onDragStart={onStartDrag}
              onDragEnd={onEndDrag}
              onTaskEdit={onTaskEdit}
            ></DetailCard>
          );
        })}
      </CardContent>
      <CardActions sx={{ marginTop: 'auto' }}>
        <Button
          sx={{
            fontSize: 11,
            color: theme.colors.alpha.black[70],
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
          onClick={() =>
            openPopup('createTask', { isStatusDisabled: true, status }, addTask)
          }
        >
          +Add new task
        </Button>
      </CardActions>
    </Card>
  );
};

export default StatusCardContainer;
