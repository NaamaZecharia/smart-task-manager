import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import * as taskApi from '../api/tasks';
import type { Task, NewTask } from '../types/Task';

type TaskContextType = {
  tasks: Task[];
  addTask: (taskData: NewTask) => Promise<void>;
  deleteTask: (id: string) => void;
  updateTask: (id: string, updatedData: Partial<Task>) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(() => {
  const saved = localStorage.getItem('tasks');
  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved);
    return parsed.filter((task: Task) => task && task.id !== undefined);
  } catch (error) {
    console.error('Failed to parse tasks from localStorage:', error);
    return [];
  }
    });

  useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = async (taskData: NewTask) => {
  const newTask = await taskApi.addTask(taskData);
  setTasks((prev) => [...prev, newTask]);
};

  const deleteTask = async (id: string) => {
    await taskApi.deleteTask(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const updateTask = async (id: string, updatedData: Partial<Task>) => {
    const updatedTask = await taskApi.updateTask(id, updatedData);
    setTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
  );
};

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
}

// הוק כדי להשתמש בו בקומפוננטות
export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within TaskProvider');
  return context;
}
