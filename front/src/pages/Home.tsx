import React from "react";
import { useState, useEffect } from "react";
import logo from "./../assets/hogwarts.png";
import { AllStudents } from "./../components/AllStudents";
import { RandomStudent } from "./../components/RandomStudent";

function Home() {
  const [randomStudent, setRandomStudent] = useState("");

  useEffect(() => {
    const fetchRandomStudent = async () => {
      const response = await fetch("http://localhost:3000/real/randomstudent");
      const student = await response.text();
      setRandomStudent(student);
    };
    fetchRandomStudent();
  }, []);

  return (
    <div className="App">
      <header>
        <img
          src={logo}
          alt="logo-hogwarts"
          width={300}
        />
      </header>

      <main>
        <AllStudents
        />
        <RandomStudent
          randomStudent={randomStudent}
          setRandomStudent={setRandomStudent}
        />
      </main>
    </div>
  );
}

export default Home;
