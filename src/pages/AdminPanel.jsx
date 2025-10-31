import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AdminPanel = () => {
  const [config, setConfig] = useState({});

  useEffect(() => {
    const fetchConfig = async () => {
      const docRef = doc(db, 'config', 'school');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setConfig(docSnap.data());
      }
    };
    fetchConfig();
  }, []);

  const updateConfig = async () => {
    await setDoc(doc(db, 'config', 'school'), config);
    alert('Config updated!');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <div className="bg-glass backdrop-blur-md p-6 rounded-lg">
        <input value={config.schoolName} onChange={(e) => setConfig({...config, schoolName: e.target.value})} placeholder="School Name" className="mb-2 p-2 border rounded w-full" />
        <input value={config.motto} onChange={(e) => setConfig({...config, motto: e.target.value})} placeholder="Motto" className="mb-2 p-2 border rounded w-full" />
        <button onClick={updateConfig} className="bg-blue-500 text-white p-2 rounded w-full">Update Config</button>
      </div>
    </div>
  );
};

export default AdminPanel;