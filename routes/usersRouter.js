// routes/usersRouter.js
const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/", usersController.getUsers);
router.get("/new", usersController.getNewUserForm);
router.post("/new", usersController.createUser);
router.get("/search", usersController.searchUsers);
router.get("/delete", usersController.deleteAllUsers);

module.exports = router;
