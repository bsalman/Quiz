import { useContext } from "react";
import SubjectsContext from "../context/subjects";

const useSubjectsContext = () => {
  return useContext(SubjectsContext);
};

export { useSubjectsContext };
