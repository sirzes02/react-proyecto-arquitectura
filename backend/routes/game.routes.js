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
  await games.sort(function (a, b) {
    return b.year - a.year;
  });
  res.json([games[0], games[1], games[2], games[3], games[4]]);
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

  if (games.image)
    fs.unlink(`./${games.image}`, (err) => {
      if (err) throw err;
    });

  await Game.findByIdAndRemove(req.params.id);
  res.json({ status: "Game Deleted" });
});

module.exports = router;
