// TriviaCard.jsx
import React, { useMemo, useState, useEffect } from 'react';
import { Button } from './components/button';

const TriviaCard = ({
  question,
  onAnswer,
  onNextQuestion,
  currentQuestionIndex,
  totalQuestions,
  autoReveal, // New prop to signal timer expiry
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Reset the selected answer when a new question loads
  useEffect(() => {
    setSelectedAnswer(null);
  }, [question]);

  // Auto-select the correct answer if autoReveal is true and no answer has been chosen
  useEffect(() => {
    if (autoReveal && !selectedAnswer) {
      setSelectedAnswer(question.correct_answer);
    }
  }, [autoReveal, question, selectedAnswer]);

  // Shuffle the answer options only once per question
  const shuffledAnswers = useMemo(() => {
    return [...question.incorrect_answers, question.correct_answer].sort(
      () => Math.random() - 0.5
    );
  }, [question]);

  // Handle manual answer selection
  const handleAnswer = (answer) => {
    if (!selectedAnswer) {
      setSelectedAnswer(answer);
      onAnswer(); // Stops the timer at the parent level
    }
  };

  // Determine if an answer is correct
  const isAnswerCorrect = (answer) => answer === question.correct_answer;

  // Compute dynamic classes for each answer button
  const getButtonClasses = (answer) => {
    const baseClasses =
      'w-full py-4 px-6 text-left rounded-lg transition-colors duration-200';
    if (!selectedAnswer) {
      // Before selection: standard clickable style
      return `${baseClasses} bg-gray-700 hover:bg-gray-600 text-gray-100`;
    } else {
      // After an answer has been selected:
      if (isAnswerCorrect(answer)) {
        // Correct answer glows green
        return `${baseClasses} bg-green-600 text-white`;
      }
      if (answer === selectedAnswer && !isAnswerCorrect(answer)) {
        // Incorrect selection glows red
        return `${baseClasses} bg-red-500 text-white`;
      }
      // Other options appear disabled
      return `${baseClasses} bg-gray-500 text-gray-300`;
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-2xl p-8 min-h-[500px]">
      <h3
        className="text-3xl mb-8 text-gray-100 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: question.question }}
      />
      <div className="space-y-4">
        {shuffledAnswers.map((answer, index) => (
          <Button
            key={index}
            onClick={() => handleAnswer(answer)}
            className={getButtonClasses(answer)}
            disabled={!!selectedAnswer} // Disable buttons once an answer is chosen
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </div>
      {selectedAnswer && (
        <div className="mt-8">
          <Button
            onClick={onNextQuestion}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
          >
            {currentQuestionIndex < totalQuestions - 1
              ? 'Next Question'
              : 'Finish Game'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default TriviaCard;
