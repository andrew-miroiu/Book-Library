const pool = require("./pool");

async function getAllUsernames() {
  const { rows } = await pool.query("SELECT * FROM usernames");
  return rows;
}

async function insertUsername(username) {
  await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
}

async function searchUsernames(query) {
  const { rows } = await pool.query("SELECT * FROM usernames WHERE username ILIKE $1", [`%${query}%`]);
  return rows;
}

async function deleteAllUsernames(){
  const {rows} = await pool.query("DELETE FROM usernames");
  return rows;
}

module.exports = {
  getAllUsernames,
  insertUsername,
  searchUsernames,
  deleteAllUsernames
};
