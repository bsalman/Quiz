import axios from "axios";
/**
 *
 * @param {*} name
 * @param {*} email
 * @param {*} subjectId
 * @returns
 */
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
    throw new Error(`Error in addUser: : ${error}`);
  }
};
/**
 *
 * @param {*} subjectId
 * @returns
 */
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
    // console.error("Error fetching questions:", error);

    // return [];
    throw new Error(`Error fetching questions: ${error}`);
  }
};
/**
 *
 * @param {*} subjectId
 * @returns
 */
const getSubjectName = async (subjectId) => {
  if (!subjectId) {
    throw new Error("getSubjectName: subjectId is required");
  }
  try {
    const response = await axios.get(
      `http://localhost:3001/subjects/${subjectId}`
    );
    const subjectName = response.data;
    return subjectName;
  } catch (error) {
    console.log(error);
    // return 404;
    throw new Error("Unable to fetch subject. Please try again later.");
  }
};

/**
 *
 * @param {*} userId
 * @param {*} subjectId
 * @param {*} score
 * @param {*} date
 * @param {*} userEmail
 * @returns
 */
const saveResult = async (userId, score, date, userEmail) => {
  if (!userId || !score || !date || !userEmail) {
    throw new Error("saveResult: All parameters are required.");
  }
  const url = `http://localhost:3001/users/${userId}`;
  // Daten vorbereiten
  const sendData = {
    score,
    date
  };

  try {
    const { data: user } = await axios.get(url);

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    const updatedResults = user.results
      ? [...user.results, sendData]
      : [sendData];

    const { data: updatedUser } = await axios.patch(url, {
      results: updatedResults
    });
    console.log("Result saved successfully:", updatedUser);
    return updatedUser;
  } catch (error) {
    console.error("Error saving result:", error.message);
    throw new Error("Unable to save result. Please try again later.");
  }
};

export { addUser, getQuestions, getSubjectName, saveResult };
