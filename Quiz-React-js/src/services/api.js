import axios from "axios";
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
      console.log(data);
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

const getQuestions = async (subjectId) => {
  const url = "http://localhost:3001/Question";
  try {
    const response = await axios.get(url);
    const allQuestions = response.data;
    // Filter questions by subjectId
    const filteredQuestions = allQuestions.filter(
      (q) => q.subjectId === subjectId
    );
    // Randomly select 20 questions
    const selectedQuestions = filteredQuestions
      .sort(() => Math.random() - 0.5)
      .slice(0, 20);
    return selectedQuestions;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};

const getSubjectName = async (subjectId) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/subjects/${subjectId}`
    );
    const subjectName = response.data;
    return subjectName;
  } catch (error) {
    console.log(error);
    return 404;
  }
};

export { addUser, getQuestions, getSubjectName };
