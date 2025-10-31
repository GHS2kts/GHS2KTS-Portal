import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const AuthModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-glass backdrop-blur-md border border-glass-border rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Staff Portal Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-2 p-2 bg-transparent border border-glass-border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 bg-transparent border border-glass-border rounded"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button onClick={handleLogin} className="w-full bg-highlight text-white p-2 rounded">Login</button>
        <button onClick={onClose} className="w-full mt-2 text-gray-500">Close</button>
      </div>
    </div>
  );
};

export default AuthModal;