import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import gsap from 'gsap';

const Signage = () => {
  const [config, setConfig] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
  const [slides, setSlides] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'config', 'school'), (doc) => {
      setConfig(doc.data());
    });
    // Fetch slides from Firestore
    // Mock slides for now
    setSlides([
      { type: 'intro', duration: 10, content: 'School Logo' },
      { type: 'weather', duration: 15, content: 'Weather for Haripur' },
      // Add more slides
    ]);
    return () => unsub();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (slides.length > 0) {
      const slide = slides[currentSlideIndex];
      gsap.to('.progress-bar', { width: '100%', duration: slide.duration, ease: 'none' });
      // Animate slide in
      gsap.fromTo('.slide-content', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 });
    }
  }, [currentSlideIndex, slides]);

  useEffect(() => {
    if (slides.length > 0) {
      const slide = slides[currentSlideIndex];
      const timer = setTimeout(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
      }, slide.duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [currentSlideIndex, slides]);

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <header className="flex justify-between p-4">
        <div className="flex items-center">
          <img src={config.logo || '/logo.png'} alt="Logo" className="h-10 mr-4" />
          <span>Lobby Display</span>
        </div>
        <div className="flex items-center">
          <span className="mr-4">{currentTime}</span>
          <span>Period 3 · 10:40–11:20 AM</span>
        </div>
      </header>
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div className="progress-bar h-1 bg-blue-500 absolute top-0 w-0"></div>
        <div className="slide-content text-center">
          {slides[currentSlideIndex]?.content}
        </div>
      </div>
      <div className="p-4 flex justify-center space-x-4">
        {/* Thumbnails */}
        <div className="w-20 h-20 bg-gray-700 rounded"></div>
        <div className="w-20 h-20 bg-blue-500 rounded"></div>
        <div className="w-20 h-20 bg-gray-700 rounded"></div>
      </div>
      <footer className="p-4 text-center">
        <p>{config.schoolName} - {config.motto}</p>
        <p>{config.designerCredit}</p>
      </footer>
    </div>
  );
};

export default Signage;