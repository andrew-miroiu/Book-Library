const db = require("../db/queries/genreQueries"); // import query functions

exports.getGenres = async (req, res) => {
  try {
    const genres = await db.getAllGenres(); // fetch from Neon/PostgreSQL
    console.log("Current genres:", genres);
    res.render("genres/index", {
      title: "Genre List",
      genres: genres // send genres to view
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.genreDetail = async (req, res) => {
  const genreId = req.params.id;
    try {
    const genre = await db.getGenreById(genreId);
    if (!genre) {
        return res.status(404).send("Genre not found");
    }
    res.render("genreDetail", {
        title: genre.name,
        genre: genre
    });
    } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.createGenreGet = (req, res) => {
    res.render("newGenre", { title: "Create a new genre" });
};

exports.createGenrePost = async (req, res) => {
    const {name, description} = req.body;
    try {
        await db.insertGenre(name, description);
        console.log("Genre to be saved:", name, description);
        res.redirect("/genres");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    } 
};
exports.deleteGenrePost = async (req, res) => {
    const genreId = req.params.id;
    try {
        await db.deleteGenre(genreId);
        res.redirect("/genres");
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};
