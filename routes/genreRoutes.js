const express = require("express");
const router = express.Router();
const genreController = require("../controllers/genreController");

router.get("/", genreController.getGenres);
router.get("/:id", genreController.genreDetail);

router.get("/new", genreController.createGenreGet);
router.post("/new", genreController.createGenrePost);

router.post("/:id/delete", genreController.deleteGenrePost);

module.exports = router;
