import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    setCategory(category);
    console.log("Category Selected: ", category);
  };

  const handleLevelSelect = (level) => {
    setLevel(level);
    console.log("Level Selected: ", level);
    if (category && level) {
      navigate(`/quiz/${category}/${level}`);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-no-repeat bg-starfield flex justify-center items-center">
      <div className="absolute top-0 left-0 w-full h-full starfield"></div>

      <div className="text-center bg-opacity-70 bg-transparent p-6 rounded-lg shadow-xl w-full max-w-lg relative border border-white">
        {!category ? (
          <div>
            <h1 className="text-3xl mb-4 text-black font-bold">
              Select a Quiz Category
            </h1>
            <div className="space-y-4">
              <button
                onClick={() => handleCategorySelect("dataStructure")}
                className="w-full p-4 bg-blue-600 text-white rounded-lg shadow-lg text-xl font-semibold hover:bg-blue-700 transition duration-300"
              >
                Data Structures & Algorithms
              </button>
              <button
                onClick={() => handleCategorySelect("computerNetworks")}
                className="w-full p-4 bg-green-600 text-white rounded-lg shadow-lg text-xl font-semibold hover:bg-green-700 transition duration-300"
              >
                Computer Networks
              </button>
              <button
                onClick={() => handleCategorySelect("operatingSystem")}
                className="w-full p-4 bg-yellow-600 text-white rounded-lg shadow-lg text-xl font-semibold hover:bg-yellow-700 transition duration-300"
              >
                Operating Systems
              </button>
              <button
                onClick={() => handleCategorySelect("databaseManagement")}
                className="w-full p-4 bg-red-600 text-white rounded-lg shadow-lg text-xl font-semibold hover:bg-red-700 transition duration-300"
              >
                Database Management
              </button>
              <button
                onClick={() => handleCategorySelect("react")}
                className="w-full p-4 bg-purple-600 text-white rounded-lg shadow-lg text-xl font-semibold hover:bg-purple-700 transition duration-300"
              >
                React
              </button>
            </div>
          </div>
        ) : !level ? (
          <div>
            <h1 className="text-3xl mb-4 text-black font-bold">
              Select Difficulty Level for {category}
            </h1>
            <div className="space-y-4">
              <button
                onClick={() => handleLevelSelect("beginner")}
                className="w-full p-4 bg-blue-600 text-white rounded-lg shadow-lg text-xl font-semibold hover:bg-blue-700 transition duration-300"
              >
                Beginner Level
              </button>
              <button
                onClick={() => handleLevelSelect("intermediate")}
                className="w-full p-4 bg-green-600 text-white rounded-lg shadow-lg text-xl font-semibold hover:bg-green-700 transition duration-300"
              >
                Intermediate Level
              </button>
              <button
                onClick={() => handleLevelSelect("advanced")}
                className="w-full p-4 bg-red-600 text-white rounded-lg shadow-lg text-xl font-semibold hover:bg-red-700 transition duration-300"
              >
                Advanced Level
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
