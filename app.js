// app.js
const express = require("express");
const path = require("path");
const bookRoutes = require("./routes/bookRoutes");
const authorRoutes = require("./routes/authorRoutes");
const genreRoutes = require("./routes/genreRoutes");
const db = require("./db/queries/bookQueries");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  try {
    const books = await db.getRandomBooks(5); // We'll add this in queries
    res.render("index", { title: "Library Home", books });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);
app.use("/genres", genreRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
