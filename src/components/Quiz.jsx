import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Question from "./Question";
import Scoreboard from "./Scoreboard";

const Quiz = () => {
  const { category, level } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch(`/data/${category}/${level}.json`);
      const data = await response.json();
      setQuestions(data);
    };

    fetchQuestions();
  }, [category, level]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswer = (selected) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = selected;
    setUserAnswers(updatedAnswers);
    if (selected === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const finalUpdatedAnswers = [...updatedAnswers];
      finalUpdatedAnswers[currentQuestion] = selected;
      setUserAnswers(finalUpdatedAnswers);

      setQuizComplete(true);

      const updatedResults = questions.map((question, index) => ({
        question: question.question,
        userAnswer:
          finalUpdatedAnswers[index] !== undefined
            ? finalUpdatedAnswers[index]
            : "No Answer",
        correctAnswer: question.answer,
        isCorrect: finalUpdatedAnswers[index] === question.answer,
      }));

      setResults(updatedResults);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizStarted(false);
    setQuizComplete(false);
    setUserAnswers([]);
    setResults([]);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  if (!questions.length) {
    return <div className="text-white text-center">Loading questions...</div>;
  }

  return (
    <div
      className={`min-h-screen ${
        quizStarted
          ? "bg-cover bg-[url('https://plus.unsplash.com/premium_photo-1682310555884-6fc9d2bd8fd6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGhpbmtpbmclMjBlbW9qaXxlbnwwfHwwfHx8MA%3D%3D')]"
          : "bg-cover bg-[url('https://images.unsplash.com/photo-1524678714210-9917a6c619c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHF1aXp8ZW58MHx8MHx8fDA%3D')]"
      } flex items-center justify-center`}
    >
      <div className="p-6 max-w-lg mx-auto bg-transparent rounded-lg shadow-lg w-full border border-white">
        {!quizStarted ? (
          <div className="text-center">
            <h2 className="text-3xl mb-4 text-black font-bold">
              You've selected the{" "}
              <span className="text-violet-600">{category}</span> quiz at{" "}
              <span className="text-violet-600">{level}</span> level
            </h2>
            <button
              onClick={handleStartQuiz}
              className="w-full p-4 bg-purple-500 text-white rounded-lg shadow-lg text-xl font-semibold hover:bg-purple-600 transition duration-300"
            >
              Start Quiz
            </button>
            <button
              onClick={handleGoHome}
              className="w-full p-4 bg-blue-500 text-white rounded-lg shadow-lg text-xl font-semibold hover:bg-blue-600 transition duration-300"
            >
              Go to Home Page
            </button>
          </div>
        ) : !quizComplete ? (
          <div className="space-y-6">
            {questions[currentQuestion] && (
              <Question
                question={questions[currentQuestion]}
                handleAnswer={handleAnswer}
              />
            )}
          </div>
        ) : (
          <div className="text-center space-y-4">
            <Scoreboard score={score} />
            <div>
              <h3 className="text-xl font-semibold mt-4">Your Results:</h3>
              <div className="space-y-4 mt-4">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg ${
                      result.isCorrect ? "bg-green-200" : "bg-red-200"
                    }`}
                  >
                    <p className="font-semibold">{result.question}</p>
                    <p>
                      <span className="font-bold">Your Answer: </span>
                      {result.userAnswer}
                    </p>
                    <p>
                      <span className="font-bold text-green-700">
                        Correct Answer:{" "}
                      </span>
                      {result.correctAnswer}
                    </p>
                  </div>
                ))}
              </div>
              <button
                onClick={handleRestartQuiz}
                className="w-full p-4 bg-green-500 text-white rounded-lg shadow-lg text-xl font-semibold hover:bg-green-600 transition duration-300 mb-4"
              >
                Restart Quiz
              </button>
              <button
                onClick={handleGoHome}
                className="w-full p-4 bg-blue-500 text-white rounded-lg shadow-lg text-xl font-semibold hover:bg-blue-600 transition duration-300"
              >
                Go to Home Page
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
