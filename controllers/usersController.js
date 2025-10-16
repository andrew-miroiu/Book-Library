const db = require("../db/queries"); // import funcțiile de query

exports.getUsers = async (req, res) => {
  try {
    const users = await db.getAllUsernames(); // preia din Neon/PostgreSQL
    console.log("Current users:", users);

    res.render("index", {
      title: "User List",
      users: users.map(u => u.username) // trimitem doar username-ul către view
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.getNewUserForm = (req, res) => {
  res.render("newUser", { title: "Create a new user" });
};

exports.createUser = async (req, res) => {
  const { username } = req.body;
  try {
    await db.insertUsername(username); // inserează în Neon/PostgreSQL
    console.log("username to be saved:", username);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.searchUsers = async (req, res) => {
  try {
    const query = req.query.query;
    const users = await db.getAllUsernames();
    const filteredUsers = users.filter(u => u.username.toLowerCase().includes(query.toLowerCase()));

    res.render("index", {
      title: `Search results for "${query}"`,
      users: filteredUsers.map(u => u.username)
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

exports.deleteAllUsers = async (req, res) => {
  try {
    await db.deleteAllUsernames();
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
