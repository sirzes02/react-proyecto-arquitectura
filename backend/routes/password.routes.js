const express = require("express");
const router = express.Router();

const Password = require("../Models/Password");

router.get("/:id", async (req, res) => {
  const password = await Password.find();

  const newPass = new Password({
    password: "HOLA",
  });
  await newPass.save();

  for (let i = 0; i < password.length; i++)
    if (password[i].password === req.params.id) {
      res.json({ status: true });
      return;
    }

  res.json({ status: false });
});

router.get("/", async (req, res) => {
  var password = await Password.find();
  res.json(password);
});

router.post("/", async (req, res) => {
  const { password } = req.body;
  const newPass = new Password({
    password,
  });
  await newPass.save();
  res.json({ status: "Password Saved" });
});

router.delete("/:id", async (req, res) => {
  await Password.findByIdAndRemove(req.params.id);
  res.json({ status: "Password Deleted" });
});

module.exports = router;
