function Question({ question, index }) {
  // const renderedAnsWers = questionArray[currentIndex].map((answer) => {
  //   return;
  // });
  console.log(index);

  return (
    <div className="question-text">
      Question number {index + 1} :&nbsp;{question}
    </div>
  );
}

export default Question;
