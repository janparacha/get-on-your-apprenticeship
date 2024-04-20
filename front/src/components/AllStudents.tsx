import React, { useEffect, useState } from "react";
import { Filter } from "./Filter";

export interface Student {
  id: string;
  attributes: {
    name: string;
    house: string;
    alias_names: string[];
  };
}
export const AllStudents = () => {
  const [students, setStudents] = useState([]);

  return (
    <>
      <h2>Here is a list of all students:</h2>
      <Filter setStudents={setStudents} />

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
            {students.map((student: Student) => (
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
