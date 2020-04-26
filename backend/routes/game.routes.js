const express = require("express");
const router = express.Router();

const Game = require("../Models/Game");

// Obtener todos los juegos
router.get("/", async (req, res) => {
  var games = await Game.find();
  const rev = games.reverse();
  res.json(rev);
});

//Obtener Los 5 ultimos juegos
router.get("/nuevosJuegos", async (req, res) => {
  let games = await Game.find();

  //Orden segun el anio
  games.sort(function (a, b) {
    return a.year - b.year;
  });

  //Borrado de restantes
  if (games.length >= 5)
    for (let i = 5; i < games.length; i++) games.splice(i, 1);

  res.json(games);
});

//Obtener buscar por parametros
router.post("/buscarTipo2", async (req, res) => {
  let games = await Game.find();

  const {
    title,
    genre,
    clasification,
    year,
    hardware,
    requirements,
  } = req.body;

  let arrTITLE = [],
    arrGENRE = [],
    arrCLASS = [],
    arrYEAR = [],
    arrHARDWARE = [],
    arrREQUIREMENTS = [],
    posibilidades = [];

  if (title != "") {
    var palabrasTitulo = title.toLowerCase().split(" ");
    var palabrasJuego, contIgualdad;
  }

  for (let i = 0; i < games.length; i++) {
    if (games[i].genre === genre) arrGENRE.push(games[i]);
    if (games[i].clasification === clasification) arrCLASS.push(games[i]);
    if (games[i].year === year) arrYEAR.push(games[i]);
    if (games[i].hardware === hardware) arrHARDWARE.push(games[i]);
    if (games[i].requirements === requirements) arrREQUIREMENTS.push(games[i]);

    if (title != "") {
      palabrasJuego = games[i].title.toLowerCase().split(" ");
      contIgualdad = 0;

      for (let j = 0; j < palabrasTitulo.length; j++)
        for (let k = 0; k < palabrasJuego.length; k++)
          if (palabrasJuego[k] == palabrasTitulo[j]) contIgualdad++;

      if (contIgualdad > 0) arrTITLE.push(games[i]);
    }
  }

  res.json(arrGENRE);
});

//Obtener buscar por descripcion
router.post("/buscarTipo1", async (req, res) => {
  let games = await Game.find();

  const { busqueda } = req.body;

  let arr = [];

  var palabrasDescripcion = busqueda.toLowerCase().split(" ");
  var palabrasJuego, contIgualdad;

  for (let i = 0; i < games.length; i++) {
    palabrasJuego = games[i].description.toLowerCase().split(" ");
    contIgualdad = 0;

    for (let j = 0; j < palabrasDescripcion.length; j++)
      for (let k = 0; k < palabrasJuego.length; k++)
        if (palabrasJuego[k] == palabrasDescripcion[j]) contIgualdad++;

    if (contIgualdad > 0) arr.push(games[i]);
  }

  res.json(arr);
});

router.get("/:id", async (req, res) => {
  const games = await Game.findById(req.params.id);
  res.json(games);
});

router.post("/", async (req, res) => {
  const {
    title,
    genre,
    clasification,
    year,
    hardware,
    requirements,
    description,
  } = req.body;
  const game = new Game({
    title,
    genre,
    clasification,
    year,
    hardware,
    requirements,
    description,
  });
  await game.save();
  res.json({ status: "Game Saved" });
});

router.put("/:id", async (req, res) => {
  const {
    title,
    genre,
    clasification,
    year,
    hardware,
    requirements,
    description,
  } = req.body;
  const newGame = {
    title,
    genre,
    clasification,
    year,
    hardware,
    requirements,
    description,
  };
  await Game.findByIdAndUpdate(req.params.id, newGame);
  res.json({ status: "Game Updated" });
});

router.delete("/:id", async (req, res) => {
  await Game.findByIdAndRemove(req.params.id);
  res.json({ status: "Game Deleted" });
});

module.exports = router;
