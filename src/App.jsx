import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Quiz from "./components/Quiz";

function App() {
  return (
    <Router >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/:category/:level" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;
