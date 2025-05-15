import { Link } from "react-router-dom";
import { useSubjectsContext } from "../hooks/use-subjects-context";
import { getSubjectName } from "../services/api";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
function StartPage() {
  const { user } = useSubjectsContext();
  const [subject, setSubject] = useState({});
  useEffect(() => {
    getSubjectName(user.subjectId).then((data) => {
      // Handle the data here
      setSubject(data);
    });
  }, []);

  return (
    <div className="start-page card">
      <div className="card-body">
        <h3 className="H2">Hello {user.name}</h3>
        <h3 className="H2">How much do you know about {subject.name}?</h3>
        <p className="text">
          Trends and tactics are constantly changing.Test your knowledge.
        </p>
        <div className="start-btn">
          <Link to={`/quiz`} id="startBtn" className="button-secondary">
            start
          </Link>
        </div>

        <span className="text">
          <FontAwesomeIcon icon={faClock} />
          &nbsp; it Takes 5 minutes
        </span>
      </div>
    </div>
  );
}

export default StartPage;
