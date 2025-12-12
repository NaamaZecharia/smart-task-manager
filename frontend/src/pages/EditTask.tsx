import { useParams, useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import { useState, useEffect } from 'react';

export default function EditTask() {
  const { id } = useParams();
  const { tasks, updateTask } = useTasks();
  const navigate = useNavigate();

  const taskToEdit = tasks.find((task) => task.id === id);
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
    }
  }, [taskToEdit]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    if (id){
      updateTask( id,{title: title });
    }
    navigate('/');
  };

  if (!taskToEdit) {
    return <p className="text-red-500">Task not found</p>;
  }

  return (
    <form onSubmit={handleUpdate} className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-300 p-2 rounded w-full mb-4"
        placeholder="Update task title"/>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Save Changes
      </button>
    </form>
  );
}