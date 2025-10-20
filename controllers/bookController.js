const db = require("../db/queries/bookQueries"); // import query functions
const authorDb = require("../db/queries/authorQueries");
const genreDb = require("../db/queries/genreQueries");

exports.getBooks = async (req, res) => {
  try {
    const books = await db.getAllBooks(); // fetch from Neon/PostgreSQL
    console.log("Current books:", books);
    res.render("index", {
      title: "Book List",
      books: books // send books to view
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.getBookById = async (req, res) => {
  const bookId = req.params.id;
    try {
    const book = await db.getBookById(bookId); // fetch book by ID
    if (!book) {
      return res.status(404).send("Book not found");
    }
    res.render("books/bookDetail", {
        title: book.title,
        book: book
    });
    } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.getNewBookForm = async (req, res) => {
    try {
        const authors = await authorDb.getAllAuthors();
        const genres = await genreDb.getAllGenres();
        res.render("books/newBook", { title: "Create a new book", authors, genres });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};

exports.createBook = async (req, res) => {
    const {title, author, genre, summary} = req.body;
    try {
        await db.insertBook(title, author, genre, summary); // insert into Neon/PostgreSQL
        console.log("Book to be saved:", title, author, genre, summary);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }   
};

exports.deleteBookPost = async (req, res) => {
    const bookId = req.params.id;
    try {
        await db.deleteBookPost(bookId);
        res.redirect("/");
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};