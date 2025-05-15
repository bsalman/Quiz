import { useState, useEffect } from "react";
import { useSubjectsContext } from "../hooks/use-subjects-context";
import { getQuestions } from "../services/api";
import Question from "../components/Question";
import Answers from "../components/Answers";
import { useNavigate } from "react-router-dom";
import Timer from "../components/Timer";
// import { useParams } from "react-router-dom";
function QuizPage() {
  const navigate = useNavigate();
  const { user, results } = useSubjectsContext();
  const [questions, setQuestions] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const renderLoading = (error) => {
    if (error) {
      throw new Error("Something went wrong!");
    }
    return <div>Loading</div>;
  };

  useEffect(() => {
    if (user?.subjectId) {
      getQuestions(user.subjectId)
        .then((data) => {
          setQuestions(data);
          setCurrentQuestion(data[0]);
        })
        .catch((error) => {
          renderLoading(error);
        });
    }
  }, [user]);

  const NextQuestionHandel = () => {
    if (questions.length >= 0 && currentIndex < questions.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setCurrentQuestion(questions[nextIndex]);
    } else {
      navigate("/result");
    }
  };

  return (
    <div className="card">
      <div className="card-body ">
        <div className="info-container">
          <Timer />
          <div>User: {user.name}</div>
          {results ? (
            <>
              <div>
                results: {results} from{questions.length}
              </div>
            </>
          ) : (
            <div> results: 0</div>
          )}
        </div>
        <div className="questions-container">
          {currentQuestion ? (
            <>
              <Question
                question={currentQuestion.question}
                index={currentIndex}
              />
              <Answers
                answers={currentQuestion.answers}
                NextHandel={NextQuestionHandel}
              />
              {/* <button onClick={NextQuestionHandel}> next</button> */}
            </>
          ) : (
            <div>Loading</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
