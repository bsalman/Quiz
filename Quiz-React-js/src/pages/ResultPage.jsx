import { useSubjectsContext } from "../hooks/use-subjects-context";
import { useState, useEffect } from "react";

function ResultPage() {
  const { subjects, user, results } = useSubjectsContext();
  const [subject, setSubject] = useState({});

  const today = new Date();
  const formattedDate = `${String(today.getDate()).padStart(2, "0")}.${String(
    today.getMonth() + 1
  ).padStart(2, "0")}.${today.getFullYear()}`;

  useEffect(() => {
    if (subjects && user) {
      const subjectName = subjects.find(
        (subject) => Number(subject.id) === Number(user.subjectId)
      );
      setSubject(subjectName || {}); // fallback to empty object if not found
    }
  }, [subjects, user]);

  return (
    <div className="card">
      <h3>Results</h3>
      <ul className="results-list">
        <li>
          <h3>userName: </h3>
          {user ? user.name : <p>Loading</p>}
        </li>
        <li>
          <h3>result:</h3> {results} points
        </li>
        <li>
          <h3>subject:</h3>
          {subject ? subject.name : <p>loading</p>}
        </li>
        <li>
          <h3>Date:</h3>
          {formattedDate}
        </li>
      </ul>
      <p>we will sed you an E-Mail</p>
    </div>
  );
}

export default ResultPage;
