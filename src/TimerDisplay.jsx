// TimerDisplay.jsx
import React from 'react';
import { Timer } from 'lucide-react';

const TimerDisplay = ({ timeLeft, maxTime = 8 }) => {
  const percentage = (timeLeft / maxTime) * 100;

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 bg-gray-800 px-4 py-2 rounded-lg mb-2">
        <Timer className="w-6 h-6 text-emerald-400" />
        <span className="font-mono text-xl text-gray-100">{timeLeft}s</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div 
          className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default TimerDisplay;
