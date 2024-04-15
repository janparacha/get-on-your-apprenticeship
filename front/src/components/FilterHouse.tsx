import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const FilterHouse = ({ setStudents }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const house = searchParams.get("house");
  const page = searchParams.get("page");

  useEffect(() => {
    if (house) {
      const fetchStudentsHouses = async () => {
        const response = await fetch(`http://localhost:3000/real/students?house=${house}`);
        const data = await response.json();
        setStudents(data);
      };
      fetchStudentsHouses();
    } else {
      const fetchStudentsPaginated = async () => {
        const response = await fetch(`http://localhost:3000/real/students?page=${page}`);
        const data = await response.json();
        setStudents(data);
      };
      fetchStudentsPaginated();
    }
  }, [searchParams]);

  return (
    <select
      title="house"
      defaultValue={`${house}`}
      onChange={(e) => {
        const house = e.target.value;
        setSearchParams({ house });
      }}
    >
      <option value="">All</option>
      <option value="Gryffindor">Gryffindor</option>
      <option value="Slytherin">Slytherin</option>
      <option value="Hufflepuff">Hufflepuff</option>
      <option value="Ravenclaw">Ravenclaw</option>
    </select>
  );
};
