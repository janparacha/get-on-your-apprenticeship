import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const Filter = ({ setStudents }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState("");
  const [lastPage, setLastPage] = useState("");

  const house = searchParams.get("house") || "";
  const page = searchParams.get("page") || "";

  useEffect(() => {
    if (!house && !page) {
      setSearchParams({ page: "1", house: "" });
    } else {
      const fetchStudentsPaginated = async () => {
        const response = await fetch(`http://localhost:3000/real/students?page=${page}&house=${house}`);
        const data = await response.json();
        setStudents(data.data);
        setCurrentPage(data.meta.pagination.current);
        setLastPage(data.meta.pagination.last);
        setSearchParams({ page: `${data.meta.pagination.current}`, house: `${house}` });
      };
      fetchStudentsPaginated();
    }
  }, [searchParams]);
  return (

    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{display:"flex", gap:"10px", justifyContent:"center"}}>
        <p>Select a house</p>
        <select
          title="house"
          style={{borderRadius:"5px", height:"30px"}}
          defaultValue={`${house}`}
          onChange={(e) => {
            setSearchParams({ page: `${page}`, house: e.target.value });
          }}
        >
          <option value="">All</option>
          <option value="Gryffindor">Gryffindor</option>
          <option value="Slytherin">Slytherin</option>
          <option value="Hufflepuff">Hufflepuff</option>
          <option value="Ravenclaw">Ravenclaw</option>
        </select>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 0"}}>
        <button
          disabled={parseInt(currentPage) === 1}
          onClick={() => setSearchParams({ page: `${parseInt(currentPage) - 1}`, house: `${house}` })}
        >
          Page précédente
        </button>
        <p> Page numéro : {currentPage}</p>
        <p> Nombre de page : {lastPage || "Dernière page atteinte"}</p>
        <button
          disabled={!lastPage}
          onClick={() => setSearchParams({ page: `${parseInt(currentPage) + 1}`, house: `${house}` })}
        >
          Page suivante
        </button>
      </div>

    </div>
  );
};
