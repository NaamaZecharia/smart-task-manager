import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import Login from './pages/Login';
import CategoriesPage from './pages/Categories';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <>
    <Navbar /> 
    <div className="p-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/categories" element={<PrivateRoute><CategoriesPage /></PrivateRoute>} />
      </Routes>
    </div>
    </>
  );
}

export default App;
