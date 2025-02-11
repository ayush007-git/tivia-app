// CategorySelector.jsx
import React from 'react';
import { Button } from './components/button';
import {
  Brain,
  BookOpen,
  Film,
  Music,
  Monitor,
  Gamepad,
  Grid,
  FlaskConical,
  Cpu,
  Calculator,
  Archive,
  Volleyball,
  Globe,
  History,
  Shield,
  Brush,
  User,
  Aperture,
  Truck,
  Smartphone,
  Smile,
} from 'lucide-react';

const CATEGORIES = [
  { id: 9, name: 'General Knowledge', icon: Brain },
  { id: 10, name: 'Entertainment: Books', icon: BookOpen },
  { id: 11, name: 'Entertainment: Film', icon: Film },
  { id: 12, name: 'Entertainment: Music', icon: Music },
  { id: 13, name: 'Entertainment: Musicals & Theatres', icon: Film },
  { id: 14, name: 'Entertainment: Television', icon: Monitor },
  { id: 15, name: 'Entertainment: Video Games', icon: Gamepad },
  { id: 16, name: 'Entertainment: Board Games', icon: Grid },
  { id: 17, name: 'Science & Nature', icon: FlaskConical },
  { id: 18, name: 'Science: Computers', icon: Cpu },
  { id: 19, name: 'Science: Mathematics', icon: Calculator },
  { id: 20, name: 'Mythology', icon: Archive },
  { id: 21, name: 'Sports', icon: Volleyball },
  { id: 22, name: 'Geography', icon: Globe },
  { id: 23, name: 'History', icon: History },
  { id: 24, name: 'Politics', icon: Shield },
  { id: 25, name: 'Art', icon: Brush },
  { id: 26, name: 'Celebrities', icon: User },
  { id: 27, name: 'Animals', icon: Aperture },
  { id: 28, name: 'Vehicles', icon: Truck },
  { id: 29, name: 'Entertainment: Comics', icon: BookOpen },
  { id: 30, name: 'Science: Gadgets', icon: Smartphone },
  { id: 31, name: 'Entertainment: Anime & Manga', icon: Film },
  { id: 32, name: 'Entertainment: Cartoon & Animations', icon: Smile },
];

const CategorySelector = ({ onSelectCategory }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="w-full max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-12 text-emerald-400">
          Choose a Category
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((category) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.id}
                onClick={() => onSelectCategory(category)}
                className="h-36 flex flex-col items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 text-gray-100 rounded-xl transition-colors border-none"
              >
                <IconComponent className="w-10 h-10 text-emerald-400" />
                <span className="text-center px-2">{category.name}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategorySelector;
