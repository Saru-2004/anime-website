const express = require("express");

const router = express.Router();

const db = require("../database/db");


// ADD FAVORITE
router.post("/add-favorite", (req, res) => {

  if(!req.session.user){
    return res.send("Login required");
  }

  const {
    anime_id,
    title,
    image
  } = req.body;

  db.prepare(`
    INSERT INTO favorites (
      user_id,
      anime_id,
      title,
      image
    )
    VALUES (?, ?, ?, ?)
  `).run(
    req.session.user.id,
    anime_id,
    title,
    image
  );

  res.send("Favorite added");

});


// GET USER FAVORITES
router.get("/favorites", (req, res) => {

  if(!req.session.user){
    return res.json([]);
  }

  const favorites = db.prepare(`
    SELECT * FROM favorites
    WHERE user_id = ?
  `).all(req.session.user.id);

  res.json(favorites);

});


module.exports = router;