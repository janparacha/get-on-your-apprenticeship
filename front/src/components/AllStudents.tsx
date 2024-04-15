import React, { useEffect } from "react";
import { FilterHouse } from "./FilterHouse";

export const AllStudents = ({ students, setStudents }) => {
  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch("http://localhost:3000/real/");
      const { data } = await response.json();
      setStudents(data);
    };
    fetchStudents();
  }, []);

  return (
    <>
      <h2>Here is a list of all students:</h2>
      <FilterHouse setStudents={setStudents} />
      {students ? (
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>House</th>
              <th>Nickname</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={crypto.randomUUID()}>
                <td>{student.attributes.name}</td>
                <td>{student.attributes.house ? student.attributes.house : "SDF"}</td>
                <td>{student.attributes.alias_names ? student.attributes.alias_names[0] : "Pas de surnoms"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
