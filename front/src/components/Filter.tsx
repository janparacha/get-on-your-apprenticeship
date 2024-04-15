import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const Filter = ({ setStudents }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1)

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
    }
    else if (page) {
      const fetchStudentsPaginated = async () => {
        const response = await fetch(`http://localhost:3000/real/students?page=${page}`);
        const data = await response.json();
        setStudents(data.data);
        setCurrentPage(data.meta.pagination.current)
      };
      fetchStudentsPaginated();
    }
  }, [searchParams]);

  return (
    <>
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
    <button disabled={currentPage === 1} onClick={() => setSearchParams(currentPage !== 1 ? {page:`${currentPage - 1}`}: {page:`${currentPage}`})}> Page précédente </button>
    <p> Page numéro : {currentPage}</p> 
    <button onClick={() => setSearchParams({page:`${currentPage + 1}`})}> Page suivante </button>
    </>
  );
};
