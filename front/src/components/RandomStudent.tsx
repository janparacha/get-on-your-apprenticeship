import React from "react";

export const RandomStudent = ({ randomStudent, setRandomStudent }) => {
  const fetchRandomStudent = async () => {
    const response = await fetch("http://localhost:3000/real/randomstudent");
    const student = await response.text();
    setRandomStudent(student);
  };
  return (
    <>
      <button onClick={() => fetchRandomStudent()}>Tirez au sort votre champion</button>
      {randomStudent ? <p>{randomStudent}</p> : <p>Loading...</p>}
    </>
  );
};
