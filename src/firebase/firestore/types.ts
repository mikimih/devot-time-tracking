export const collections = { USERS: 'users', TASK: 'task' };
import { Timestamp } from '@firebase/firestore-types';

export interface User {
  email: string;
  displayName: string;
  password: string;
  tasks?: Task[];
}

export interface Task {
  id: string;
  description: string;
  createdAt: Date;
  duration: number;
  isStopped: boolean;
  tracked?: TrackedTask[];
}
export interface UpdateTaskType {
  id: string;
  description?: string;
  duration?: number;
  isStopped?: boolean;
  tracked?: TrackedTask[];
}

export interface TrackedTask {
  date: Date;
  timeTrack: Timestamp;
}
