export enum TaskStatus {
  TODO = 'todo',
  ON_HOLD = 'on_hold',
  IN_PROGRESS = 'in_progress',
  DONE = 'done'
}

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export interface Task {
  id: string;
  status: TaskStatus;
  name: string;
  assignees: string[];
  timer: number;
  priority: Priority;
}
