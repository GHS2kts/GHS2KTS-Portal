import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const TeacherDashboard = () => {
  const [totalStudents, setTotalStudents] = useState(30);
  const [absent, setAbsent] = useState(0);
  const [leave, setLeave] = useState(0);
  const [off, setOff] = useState(0);
  const present = totalStudents - absent - leave - off;

  const submitAttendance = async () => {
    await addDoc(collection(db, 'attendanceLogs'), {
      date: new Date(),
      totalStudents,
      absent,
      leave,
      off,
      present,
    });
    alert('Attendance submitted!');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Teacher Dashboard</h1>
      <div className="bg-glass backdrop-blur-md p-6 rounded-lg">
        <p>Total Students: {totalStudents}</p>
        <input type="number" value={absent} onChange={(e) => setAbsent(Number(e.target.value))} placeholder="Absent" className="mb-2 p-2 border rounded w-full" />
        <input type="number" value={leave} onChange={(e) => setLeave(Number(e.target.value))} placeholder="Leave" className="mb-2 p-2 border rounded w-full" />
        <input type="number" value={off} onChange={(e) => setOff(Number(e.target.value))} placeholder="Off" className="mb-2 p-2 border rounded w-full" />
        <p>Present: {present}</p>
        <button onClick={submitAttendance} className="bg-blue-500 text-white p-2 rounded w-full">Submit Attendance</button>
      </div>
    </div>
  );
};

export default TeacherDashboard;