import Router from "./pages/Router";
import { useEffect } from "react";
import { useSubjectsContext } from "./hooks/use-subjects-context";
function App() {
  const { getAllSubjects } = useSubjectsContext();
  useEffect(() => {
    getAllSubjects();
  }, []);

  return (
    <>
      <div className="main-container">
        <Router />
      </div>
    </>
  );
}

export default App;
