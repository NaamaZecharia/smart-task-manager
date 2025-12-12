import { useTasks } from '../context/TaskContext';
import { Link } from 'react-router-dom';

export default function Home() {
  const { tasks, deleteTask } = useTasks();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      {tasks.length === 0 && <p>No tasks yet. Add one!</p>}
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded mb-2">
          <span>{task.title}</span>
          <Link
            to={`/edit/${task.id}`}
            className="text-blue-500 hover:underline mr-2">
            Edit
          </Link>
          <button
            onClick={() => deleteTask(task.id)}
            className="text-red-500 hover:underline">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
