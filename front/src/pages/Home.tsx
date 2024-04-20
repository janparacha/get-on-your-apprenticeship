import React from "react";
import logo from "./../assets/hogwarts.png";
import { AllStudents } from "./../components/AllStudents";
import { RandomStudent } from "./../components/RandomStudent";

function Home() {
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
        <AllStudents />
        <RandomStudent />
      </main>
    </div>
  );
}

export default Home;
