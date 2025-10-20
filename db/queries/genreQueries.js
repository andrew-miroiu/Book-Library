const pool = require("../pool");

// 🟢 Get all genres
async function getAllGenres() {
  const { rows } = await pool.query(`
    SELECT id, name, description
    FROM genres
    ORDER BY name;
  `);
  return rows;
}

// 🟢 Get genre by ID
async function getGenreById(id) {
  const { rows } = await pool.query(
    `
    SELECT id, name, description
    FROM genres
    WHERE id = $1;
    `,
    [id]
  );
  return rows[0];
}

// 🟢 Insert a new genre
async function insertGenre(name, description) {
  await pool.query(
    `
    INSERT INTO genres (name, description)
    VALUES ($1, $2);
    `,
    [name, description]
  );
}

// 🟢 Delete a genre by ID
async function deleteGenre(id) {
  await pool.query(
    `
    DELETE FROM genres
    WHERE id = $1;
    `,
    [id]
  );
}

module.exports = {
  getAllGenres,
  getGenreById,
  insertGenre,
  deleteGenre,
};
