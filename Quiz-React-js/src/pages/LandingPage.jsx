import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSubjectsContext } from "../hooks/use-subjects-context";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  // is register  start
  const [IsRegister, setIsRegister] = useState(false);
  const handelIsRegister = () => {
    setIsRegister(true);
  };
  // is register end
  // subjects context start
  const { subjects, addUser } = useSubjectsContext();

  const renderedSubjects = subjects.map((subject) => {
    return (
      <option key={subject.id} value={subject.id}>
        {subject.name}
      </option>
    );
  });
  // subjects context end

  // hook form start
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmitHandler = (data) => {
    const sanitizedData = {
      name: DOMPurify.sanitize(data.name),
      email: DOMPurify.sanitize(data.email),
      subjectId: DOMPurify.sanitize(data.subjectId.toString())
    };
    addUser(
      sanitizedData.name,
      sanitizedData.email,
      Number(sanitizedData.subjectId)
    ).then((data) => {
      if (data === 200) {
        navigate("/start");
      }
    });
  };
  //hook form end
  return (
    <>
      <div id="info" className="info-container">
        <h1 className="H1">Are you ready...for Starting...Quiz</h1>
      </div>
      <div className="card">
        {/* {successMessage ? <p>{successMessage}</p> : ""} */}
        {IsRegister ? (
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="form form-register">
            <div>
              <input
                type="text"
                placeholder="name"
                {...register("name", {
                  required: "Name is required",
                  pattern: {
                    value: /^[a-zA-ZäöüÄÖÜß\s-]{2,}$/,
                    message: "Invalid Name "
                  }
                })}
                className={` ${errors.name ? "border-red" : ""}`}
              />
              {errors.name && (
                <span className="text-danger">{errors.name.message}</span>
              )}
            </div>
            <div>
              <input
                type="email"
                placeholder="E-Mail"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address"
                  }
                })}
                className={` ${errors.name ? "border-red" : ""}`}
              />
              {errors.email && (
                <span className="text-danger">{errors.email.message}</span>
              )}
            </div>

            <div>
              <select
                id="subjects"
                {...register("subjectId", {
                  required: true,
                  pattern: {
                    value: /^\d+(\.\d+)?$/,
                    message: "this is not number"
                  }
                })}>
                <option key="-1" value="0" default text>
                  Choose a subject
                </option>
                {renderedSubjects}
              </select>
            </div>
            <button type="submit" className="button-secondary">
              Submit
            </button>
          </form>
        ) : (
          <>
            <h2 className="H2">
              {" "}
              To start register you self and Select the Subject pleas..
            </h2>
            <button className="button-primary" onClick={handelIsRegister}>
              register
            </button>
          </>
        )}
      </div>
    </>
  );
}
export default LandingPage;
