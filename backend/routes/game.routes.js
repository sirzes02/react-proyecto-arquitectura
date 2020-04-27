const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
    cb(null, true);
  else cb(null, false);
};
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});
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

router.post("/", upload.single("image"), async (req, res) => {
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
    title: title,
    genre: genre,
    clasification: clasification,
    year: year,
    hardware: hardware,
    requirements: requirements,
    description: description,
    image: req.file ? req.file.path : null,
  });
  await game.save();
  res.json({ status: "Game Saved" });
});

router.post("/:id", upload.single("image"), async (req, res) => {
  const games = await Game.findById(req.params.id);

  console.log(games.image);

  if (games.image)
    fs.unlink(`./${games.image}`, (err) => {
      if (err) throw err;
    });

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
    title: title,
    genre: genre,
    clasification: clasification,
    year: year,
    hardware: hardware,
    requirements: requirements,
    description: description,
    image: req.file ? req.file.path : null,
  };
  await Game.findByIdAndUpdate(req.params.id, newGame);
  res.json({ status: "Game Updated" });
});

router.delete("/:id", async (req, res) => {
  const games = await Game.findById(req.params.id);

  fs.unlink(`./${games.image}`, (err) => {
    if (err) throw err;
  });

  await Game.findByIdAndRemove(req.params.id);
  res.json({ status: "Game Deleted" });
});

module.exports = router;
