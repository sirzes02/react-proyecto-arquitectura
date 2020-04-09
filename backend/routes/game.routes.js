const express = require("express");
const router = express.Router();

const Game = require("../Models/Game");

router.get("/", async (req, res) => {
  const games = await Game.find();
  res.json(games);
});

router.get("/:id", async (req, res) => {
  const games = await Game.findById(req.params.id);
  res.json(games);
});

router.get("/about/", function(req, res) {
  res.json({ status: "ABOUT" });
});

router.post("/", async (req, res) => {
  const {
    title,
    genre,
    clasification,
    year,
    hardware,
    requirements,
    description
  } = req.body;
  const game = new Game({
    title,
    genre,
    clasification,
    year,
    hardware,
    requirements,
    description
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
    description
  } = req.body;
  const newGame = {
    title,
    genre,
    clasification,
    year,
    hardware,
    requirements,
    description
  };
  await Game.findByIdAndUpdate(req.params.id, newGame);
  res.json({ status: "Game Updated" });
});

router.delete("/:id", async (req, res) => {
  await Game.findByIdAndRemove(req.params.id);
  res.json({ status: "Game Deleted" });
});

module.exports = router;
