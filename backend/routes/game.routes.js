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
