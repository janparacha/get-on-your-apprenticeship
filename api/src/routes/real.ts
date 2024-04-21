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
  meta: Meta;
}

interface Meta {
  pagination: {
    current: number;
  };
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
    const house: string = req.query.house;
    let page: number = req.query.page;
    let response;
    let data;

    if (house) {
      response = await fetch(`https://api.potterdb.com/v1/characters?filter[house_eq]=${house}&page[number]=${page}`);
      data = (await response.json()) as ResponseWizzards;
      if (!data.meta.pagination.last) {
        response = await fetch(`https://api.potterdb.com/v1/characters?filter[house_eq]=${house}&page[number]=1`);
        data = (await response.json()) as ResponseWizzards;
        const lastPage = data.meta.pagination.last;
        response = await fetch(
          `https://api.potterdb.com/v1/characters?filter[house_eq]=${house}&page[number]=${lastPage}`
        );
        data = (await response.json()) as ResponseWizzards;
      }
      res.json(data);
    } else {
      if (page >= 47) {
        page = 47;
      }
      response = await fetch(`https://api.potterdb.com/v1/characters?page[number]=${page}`);
      const data = (await response.json()) as ResponseWizzards;
      res.json(data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Une erreur est survenue lors de la récupération des données.");
  }
});

export default realRouter;
