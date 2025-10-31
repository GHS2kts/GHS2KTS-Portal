import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Home = ({ setShowAuth }) => {
  const [config, setConfig] = useState({});
  const [currentPeriod, setCurrentPeriod] = useState('No active period');

  useEffect(() => {
    const fetchConfig = async () => {
      const docRef = doc(db, 'config', 'school');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setConfig(docSnap.data());
      }
    };
    fetchConfig();
    // Mock period calculation - integrate with timetable engine
    const interval = setInterval(() => {
      setCurrentPeriod('Period 3 · 10:40–11:20 AM'); // Placeholder
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const getBackground = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'bg-morning';
    if (hour < 18) return 'bg-afternoon';
    return 'bg-evening';
  };

  return (
    <div className={`min-h-screen ${getBackground()} bg-cover bg-center`}>
      <nav className="bg-glass backdrop-blur-md p-4">
        <div className="container mx-auto flex justify-between">
          <div>
            <h1 className="text-2xl font-bold">{config.schoolName || 'Government High School, Sector No. 2, KTS Haripur'}</h1>
            <p>{config.motto || 'Knowledge · Discipline · Pride'}</p>
          </div>
          <button onClick={() => setShowAuth(true)} className="bg-highlight text-white px-4 py-2 rounded">Staff Portal Login</button>
        </div>
      </nav>
      <div className="container mx-auto p-4">
        <div className="bg-glass backdrop-blur-md p-6 rounded-lg shadow-lg">
          <p>Current Period: {currentPeriod}</p>
          <marquee className="bg-highlight text-white p-2 rounded mt-4">Live Info Ticker: Announcements here...</marquee>
        </div>
      </div>
      <footer className="bg-glass backdrop-blur-md p-4 mt-auto">
        <p>{config.designerCredit || 'Crafted by: Khurram Irshad Khan SST(IT) - 0333-9719300'}</p>
      </footer>
    </div>
  );
};

export default Home;