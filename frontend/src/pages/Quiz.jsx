import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function QuizPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/quizzes");
        const data = await res.json();
        setQuizzes(data);
      } catch (err) {
        console.error("Error fetching quizzes:", err);
        setError("Failed to load quiz questions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  const handleNext = () => {
    const currentQuestion = quizzes[currentIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    setShowHint(false);
    setSelectedAnswer(null);
    setCurrentIndex(currentIndex + 1);
  };

  const handleSubmit = () => {
    const currentQuestion = quizzes[currentIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    setSubmitted(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 font-semibold text-xl">
       🔄 Loading the quiz...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 text-red-700 font-medium">
        {error}
      </div>
    );
  }

  if (submitted) {
    const percentage = ((score / quizzes.length) * 100).toFixed(0);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white shadow-2xl rounded-2xl p-10 text-center max-w-lg"
        >
          <h1 className="text-3xl font-bold text-blue-700 mb-4">
          Quiz Completed!
          </h1>
          <p className="text-lg text-gray-700 mb-2">
            You scored <span className="font-semibold text-blue-600">{score}</span> out of{" "}
            {quizzes.length}.
          </p>
          <p className="text-gray-600">
            Your accuracy: <span className="font-semibold">{percentage}%</span>
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setScore(0);
              setCurrentIndex(0);
            }}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Restart Quiz
          </button>
        </motion.div>
      </div>
    );
  }

  const currentQuestion = quizzes[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-2">
          Chemistry Quiz
        </h1>
        <p className="text-gray-600 text-lg">
          Test your chemistry knowledge — get AI hints and learn as you go!
        </p>
      </div>

      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200 w-full max-w-2xl"
      >
        <div className="mb-4 text-sm text-gray-500">
          Question {currentIndex + 1} of {quizzes.length}
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {currentQuestion.question}
        </h2>

        <div className="space-y-3">
          {currentQuestion.options.map((opt) => (
            <button
              key={opt}
              onClick={() => setSelectedAnswer(opt)}
              className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                selectedAnswer === opt
                  ? "bg-blue-100 border-blue-500"
                  : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            💡 {showHint ? "Hide Hint" : "Show Hint"}
          </button>

          {currentIndex < quizzes.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              Submit ✅
            </button>
          )}
        </div>

        {showHint && (
          <div className="mt-4 bg-blue-50 border-l-4 border-blue-400 p-3 rounded text-gray-700">
            💬 <span className="italic">{currentQuestion.aiHint}</span>
          </div>
        )}
      </motion.div>

    </div>
  );
}
