const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

// List all books
router.get("/", bookController.getBooks); // GET /books

// View a single book by ID
router.get("/:id", bookController.getBookById); // GET /books/:id

// Create a new book (form + submit)
router.get("/new", bookController.getNewBookForm); // GET /books/new
router.post("/new", bookController.createBook); // POST /books/new

// Delete a book
router.post("/:id/delete", bookController.deleteBookPost); // POST /books/:id/delete

module.exports = router;
