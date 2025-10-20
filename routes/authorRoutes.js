const express = require('express');
const router = express.Router();
const authorController = require("../controllers/authorController");

router.get('/', authorController.getAuthors);
router.get('/:id', authorController.getBookByAuthorId);

router.get('/new', authorController.getNewAuthorForm);
router.post('/new', authorController.createAuthor);

router.post("/:id/delete", authorController.deleteAuthor);

module.exports = router;