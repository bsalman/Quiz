import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "./StartPage";
import LandingPage from "./LandingPage";
import QuizPage from "./QuizPage";
import ResultPage from "./ResultPage";
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/start" element={<StartPage />}></Route>
        <Route path="/quiz" element={<QuizPage />}></Route>
        <Route path="/result" element={<ResultPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
