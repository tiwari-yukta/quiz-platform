const Question = ({ question, handleAnswer }) => {
  if (!question) {
    return <div className=" text-center">Loading question...</div>;
  }

  return (
    <div className="text-white">
      <h3 className="text-2xl mb-4 font-bold">{question.question}</h3>
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className="w-full p-4 bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
