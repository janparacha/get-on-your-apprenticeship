import React, { useEffect, useState } from "react";

export const RandomStudent = () => {
  const [randomStudent, setRandomStudent] = useState("");

  const fetchRandomStudent = async () => {
    const response = await fetch("https://jan-back.netlify.app/api/real/randomstudent");
    const student = await response.text();
    setRandomStudent(student);
  };

  useEffect(() => {
    if (!randomStudent) {
      fetchRandomStudent();
    }
  }, []);

  return (
    <>
      <button onClick={() => fetchRandomStudent()}>Tirez au sort votre champion</button>
      {randomStudent ? <p>{randomStudent}</p> : <p>Loading...</p>}
    </>
  );
};
