const Scoreboard = ({ score }) => {
  return (
    <div className="text-center text-white ">
      <h2 className="text-3xl mb-4">Quiz Completed</h2>
      <p className="text-2xl mb-6">Your Score: {score}</p>
    </div>
  );
};

export default Scoreboard;
