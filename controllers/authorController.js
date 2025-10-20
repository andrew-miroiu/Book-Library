const db = require("../db/queries/authorQueries");

exports.getAuthors = async (req, res) => {
    try {
        const authors = await db.getAllAuthors();
        console.log("Current authors:", authors);
        res.render("authors/index", {
            title: "Author List",
            authors: authors
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};

exports.getBookByAuthorId = async (req, res) => {
    const authorId = req.params.id;
    try {
        const books = await db.getBooksByAuthorId(authorId);
        if (!books || books.length === 0) {
            return res.status(404).send("No books found for this author");
        }
        res.render("booksByAuthor", {
            title: `Books by Author ${authorId}`,
            books: books
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};

exports.getNewAuthorForm = (req, res) => {
    res.render("newAuthor", { title: "Create a new author" });
};

exports.createAuthor = async (req, res) => {
    const { name, bio } = req.body;
    try {
        await db.insertAuthor(name, bio);
        console.log("Author to be saved:", name, bio);
        res.redirect("/authors");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};

exports.deleteAuthor = async (req, res) => {
    const authorId = req.params.id;
    try {
        await db.deleteAuthor(authorId); 
        res.redirect("/authors");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};