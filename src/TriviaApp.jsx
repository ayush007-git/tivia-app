// TriviaApp.jsx
import React, { useState, useEffect, useRef } from 'react';
import CategorySelector from './CategorySelector';
import TriviaCard from './TriviaCard';
import TimerDisplay from './TimerDisplay';
import { Button } from './components/button';

const TriviaApp = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [timeLeft, setTimeLeft] = useState(8);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // New state to signal that time is up (auto-reveal answer)
  const [autoReveal, setAutoReveal] = useState(false);

  const timerRef = useRef(null);

  const fetchQuestions = async (categoryId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple`
      );
      const data = await response.json();
      if (data.response_code === 0) {
        setQuestions(data.results);
        setCurrentQuestionIndex(0);
        setTimeLeft(15);
      } else {
        throw new Error('Failed to fetch questions');
      }
    } catch (err) {
      setError('Failed to load questions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Timer effect: runs only when a category is selected (i.e. game started)
  useEffect(() => {
    if (!selectedCategory) return;
    if (timeLeft > 0 && !isFlipped) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isFlipped) {
      // When timer runs out, flip the card and signal auto-reveal.
      setIsFlipped(true);
      setAutoReveal(true);
    }
    return () => clearInterval(timerRef.current);
  }, [timeLeft, isFlipped, selectedCategory]);

  // When an answer is selected by the user, stop the timer.
  const handleAnswer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsFlipped(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsFlipped(false);
      setTimeLeft(8);
      setAutoReveal(false);
    } else {
      // End of game – reset for a new game.
      setSelectedCategory(null);
      setQuestions([]);
    }
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    fetchQuestions(category.id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-gray-100">
        <p>Loading questions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-gray-100">
        <p>{error}</p>
        <Button onClick={() => setSelectedCategory(null)} className="ml-4">
          Try Again
        </Button>
      </div>
    );
  }

  if (!selectedCategory) {
    return <CategorySelector onSelectCategory={handleSelectCategory} />;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="w-full max-w-5xl mx-auto p-6">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-100">
            {selectedCategory.name}
          </h2>
          <TimerDisplay timeLeft={timeLeft} />
        </div>
        <TriviaCard
          question={currentQuestion}
          isFlipped={isFlipped}
          onAnswer={handleAnswer}
          onNextQuestion={handleNextQuestion}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          autoReveal={autoReveal} 
        />
      </div>
    </div>
  );
};

export default TriviaApp;
