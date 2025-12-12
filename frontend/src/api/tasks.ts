import axios from 'axios';
import type { Task, NewTask } from '../types/Task';

const API_BASE = 'http://localhost:4000/api/tasks';

type MongoTask = Omit<Task, 'id'> & { _id: string };

export const fetchTasks = async (): Promise<Task[]> => {
  const res = await axios.get(API_BASE);
 return res.data.map((task: MongoTask) => ({
    ...task,
    id: task._id,
  }));
};

export const addTask = async (task: NewTask): Promise<Task> => {
  const res = await axios.post(API_BASE, task);
  const { _id, ...data } : MongoTask = res.data;
  return { id: _id, ...data };
};

export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE}/${id}`);
};

export const updateTask = async (id: string, updated: Partial<Task>): Promise<Task> => {
  const res = await axios.put(`${API_BASE}/${id}`, updated);
  const { _id, ...data } = res.data;
  return { id: _id, ...data };
};