import { createContext, useState } from "react";
import axios from "axios";
//creating the Context
const SubjectsContext = createContext();

function Provider({ children }) {
  const [subjects, setSubjects] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [user, setUser] = useState({});
  const [results, setResult] = useState(0);
  const getAllSubjects = async () => {
    try {
      const response = await axios.get("http://localhost:3001/subjects");
      const updatedSubjects = response.data;
      setSubjects(updatedSubjects);
    } catch (error) {
      console.log(error);
    }
  };
  const getQuestions = async (subjectId) => {
    try {
      const response = await axios.get("http://localhost:3001/Question");
      const allQuestions = response.data;
      // Filter questions by subjectId
      const filteredQuestions = allQuestions.filter(
        (q) => q.subjectId === subjectId
      );
      // Randomly select 20 questions
      const selectedQuestions = filteredQuestions
        .sort(() => Math.random() - 0.5)
        .slice(0, 20);
      setQuestions(selectedQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
      return [];
    }
  };
  const addUser = async (name, email, subjectId) => {
    try {
      const sendData = {
        name,
        email,
        subjectId: subjectId ?? 0 // Provide a default value for null
      };
      const url = "http://localhost:3001/users";

      const response = await fetch(url, {
        method: "Post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(sendData)
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        return 200;
      } else {
        throw new Error(
          `Cannot get the data, response number is: ${response.status}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateResults = (resultParam) => {
    const updatedResults = resultParam;
    setResult(updatedResults);
  };

  return (
    <SubjectsContext.Provider
      value={{
        subjects,
        getAllSubjects,
        getQuestions,
        questions,
        addUser,
        user,
        updateResults,
        results
      }}>
      {children}
    </SubjectsContext.Provider>
  );
}

export { Provider };

export default SubjectsContext;
