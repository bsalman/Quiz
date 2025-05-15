import { useState } from "react";
import { useSubjectsContext } from "../hooks/use-subjects-context";
function Answers({ answers, NextHandel }) {
  const { updateResults } = useSubjectsContext();
  const [counter, setCounter] = useState(0);
  const selectHandler = (e) => {
    const text = e.target.id;
    const regex = /^\d+-[1-4]$/;
    const itemId = text.split("_")[1];

    if (regex.test(itemId)) {
      const selectedAnswer = answers.filter((answer) => {
        if (answer.id == itemId) {
          return answer;
        }
      });
      if (selectedAnswer[0]) {
        if (selectedAnswer[0].correct) {
          setCounter(counter + 1);
          updateResults(counter + 1);
        }
      } else {
        console.log("Answer not found.");
      }
    } else {
      console.log("itemId is not correct");
    }
  };
  const onClickHandler = async (e) => {
    selectHandler(e);
    await NextHandel();
  };

  const renderedAnswers = answers.map((answer) => {
    return (
      <li
        key={answer.id}
        id={`answer_${answer.id}`}
        onClick={onClickHandler}
        className="answer-btn">
        {answer.text}
      </li>
    );
  });
  return (
    <div className="answers-container">
      <ul className="answers-list">{renderedAnswers}</ul>
    </div>
  );
}

export default Answers;
