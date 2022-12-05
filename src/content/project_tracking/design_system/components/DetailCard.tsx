import React, { useCallback, useContext, useMemo, useRef } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  useTheme
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { twoDigitString } from 'src/utils/number';
import { numberToTimeObject } from 'src/utils/time';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { Priority, Task } from 'src/models/task';
import { PopupContext } from 'src/contexts/PopupContext';

const colors = ['#6dcfba', '#5895d7', '#f5c344'];

interface DetailCardProps extends Task {
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onTaskEdit?: (task: Task) => void;
}

const DetailCard: React.FC<DetailCardProps> = ({
  id,
  name,
  assignees,
  timer,
  priority,
  status,
  onDragStart,
  onDragEnd,
  onTaskEdit
}) => {
  const theme = useTheme();
  const { openPopup } = useContext(PopupContext);

  const timeObject = useMemo(() => {
    return numberToTimeObject(timer);
  }, [timer]);
  const onStartDrag = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.dataTransfer.setData('data', id);
      onDragStart && onDragStart();
    },
    [id, onDragStart]
  );
  const colorArr = useRef<string[]>([
    colors[Math.floor(Math.random() * colors.length)],
    colors[Math.floor(Math.random() * colors.length)],
    colors[Math.floor(Math.random() * colors.length)]
  ]);

  const onEndDrag = useCallback(() => {
    onDragEnd && onDragEnd();
  }, [onDragEnd]);

  const openEditPopup = useCallback(() => {
    openPopup(
      'editTask',
      {
        id,
        name,
        assignees,
        priority,
        status
      },
      onTaskEdit
    );
  }, [assignees, id, name, onTaskEdit, openPopup, priority, status]);

  return (
    <Card
      sx={{
        cursor: 'pointer',
        height: 125,
        '.MuiCardHeader-content': { width: '70%' }
      }}
      draggable
      onDragStart={onStartDrag}
      onDragEnd={onEndDrag}
      onDoubleClick={openEditPopup}
    >
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Box
            sx={{
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              display: 'inline-block',
              overflow: 'hidden',
              width: '100%'
            }}
            component={'span'}
          >
            {name}
          </Box>
        }
      />
      <CardContent
        sx={{ paddingTop: 0.5, paddingBottom: '9px !important' }}
      ></CardContent>
      <CardActions>
        {assignees.slice(0, 3).map((assignee, index) => {
          return (
            <Avatar
              key={assignee}
              alt={assignee}
              variant={'circular'}
              sx={{
                width: 30,
                height: 30,
                backgroundColor: colorArr.current[index]
              }}
            >
              {assignee.charAt(0)}
            </Avatar>
          );
        })}
        <Box
          component={'span'}
          marginLeft="auto"
          fontWeight={'bold'}
          color={theme.colors.alpha.black[50]}
        >
          {`${twoDigitString(timeObject.h)}:${twoDigitString(
            timeObject.m
          )}:${twoDigitString(timeObject.s)}`}{' '}
          h
        </Box>
        <Box component={'span'} marginLeft="auto">
          <Avatar
            variant="circular"
            sx={{
              width: 25,
              height: 25,
              backgroundColor:
                priority === Priority.LOW
                  ? theme.colors.success.lighter
                  : priority === Priority.MEDIUM
                  ? theme.colors.warning.lighter
                  : priority === Priority.HIGH
                  ? theme.colors.error.lighter
                  : ''
            }}
          >
            {priority === Priority.LOW && (
              <KeyboardArrowUpIcon color={'success'} fontSize={'small'} />
            )}
            {priority === Priority.MEDIUM && (
              <KeyboardArrowUpIcon color={'warning'} />
            )}
            {priority === Priority.HIGH && (
              <KeyboardDoubleArrowUpIcon color={'error'} fontSize={'small'} />
            )}
          </Avatar>
        </Box>
      </CardActions>
    </Card>
  );
};

export default DetailCard;
