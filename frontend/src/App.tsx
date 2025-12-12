import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddTask from './pages/AddTask';
import About from './pages/About';
import EditTask from './pages/EditTask';

function App() {
  return (
    <>
    <Navbar /> 
    <div className="p-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/about" element={<About />} />
        <Route path="/edit/:id" element={<EditTask />} />
      </Routes>
    </div>
    </>
  );
}

export default App;
