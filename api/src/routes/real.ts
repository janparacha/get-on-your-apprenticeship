import express from "express";
const realRouter = express.Router();

interface Data {
  id: string;
  type: string;
  attributes: {
    name: string;
    house: string;
  };
  links: {
    self: string;
  };
}

interface ResponseWizzards {
  data: Data[];
}

realRouter.get("/", async function (req, res, next) {
  try {
    const response = await fetch("https://api.potterdb.com/v1/characters");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Une erreur est survenue lors de la récupération des données.");
  }
});

realRouter.get("/randomstudent", async function (req, res, next) {
  try {
    const response = await fetch("https://api.potterdb.com/v1/characters");
    const { data } = (await response.json()) as ResponseWizzards;
    const students = data.map((student) => student.attributes.name);
    const randomStudent = students[Math.floor(Math.random() * students.length)];
    res.send(randomStudent);
  } catch (error) {
    console.log(error);
    res.status(500).send("Une erreur est survenue lors de la récupération des données.");
  }
});

realRouter.get("/students", async function (req, res, next) {
  try {
    const house = req.query.house;
    const page = req.query.page;
    let response;

    if (house) {
      response = await fetch(`https://api.potterdb.com/v1/characters?house=${house}`);
      const { data } = (await response.json()) as ResponseWizzards;
      const students = data.filter((student) => student.attributes.house === house);
      res.json(students);
    } else {
      if (page) {
        response = await fetch(`https://api.potterdb.com/v1/characters?page[number]=${page}`);
      } else {
        response = await fetch("https://api.potterdb.com/v1/characters?page[number]=1");
      }
      const { data } = (await response.json()) as ResponseWizzards;
      res.json(data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Une erreur est survenue lors de la récupération des données.");
  }
});

export default realRouter;
