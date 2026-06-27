import { Routes, Route } from 'react-router';
import Home from './pages/Home';
import DataStructures from './pages/DataStructures';
import Algorithms from './pages/Algorithms';
import Visualization from './pages/Visualization';
import Practice from './pages/Practice';
import Learn from './pages/Learn';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/data-structures" element={<DataStructures />} />
      <Route path="/algorithms" element={<Algorithms />} />
      <Route path="/visualize/:type/:id" element={<Visualization />} />
      <Route path="/practice" element={<Practice />} />
      <Route path="/learn" element={<Learn />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
