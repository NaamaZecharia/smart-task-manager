import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <ul className="flex space-x-6 text-lg font-medium">
        <li>
          <Link to="/" className="hover:text-yellow-300 transition">
            Home
          </Link>
        </li>
        <li>
          <Link to="/add" className="hover:text-yellow-300 transition">
            Add Task
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-yellow-300 transition">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}