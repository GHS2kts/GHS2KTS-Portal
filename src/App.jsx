import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TeacherDashboard from './pages/TeacherDashboard';
import AdminPanel from './pages/AdminPanel';
import Signage from './pages/Signage';
import AuthModal from './components/AuthModal';
import { useState } from 'react';

function App() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
        <Routes>
          <Route path="/" element={<Home setShowAuth={setShowAuth} />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/display" element={<Signage />} />
        </Routes>
        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      </div>
    </Router>
  );
}

export default App;