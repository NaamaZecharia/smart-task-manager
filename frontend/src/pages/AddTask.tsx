import { useState } from 'react';
import { useTasks } from '../context/TaskContext'; 

export default function AddTask() {
  const [task, setTask] = useState('');
  const [error, setError] = useState('');
  const { addTask } = useTasks(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
    if (error) setError(''); 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    if (!task.trim()) {
      setError('Task title is required!');
      return;
    }

    console.log('New task:', task);

    addTask({title: task, completed: false});
    setTask(''); 
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Task</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter task title"
          value={task}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
