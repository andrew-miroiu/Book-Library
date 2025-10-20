const pool = require("../pool");

// 🟢 Get all authors
async function getAllAuthors() {
  const { rows } = await pool.query(`
    SELECT id, name, bio
    FROM authors
    ORDER BY name;
  `);
  return rows;
}

// 🟢 Get all books by a specific author
async function getBooksByAuthorId(authorId) {
  const { rows } = await pool.query(
    `
    SELECT 
      b.id,
      b.title,
      b.summary,
      g.name AS genre
    FROM books b
    JOIN genres g ON b.genre_id = g.id
    WHERE b.author_id = $1
    ORDER BY b.title;
    `,
    [authorId]
  );
  return rows;
}

// 🟢 Insert a new author
async function insertAuthor(name, bio) {
  await pool.query(
    `
    INSERT INTO authors (name, bio)
    VALUES ($1, $2);
    `,
    [name, bio]
  );
}

// 🟢 Delete an author by ID
async function deleteAuthor(authorId) {
  await pool.query(
    `DELETE FROM authors WHERE id = $1;`,
    [authorId]
  );
}

module.exports = {
  getAllAuthors,
  getBooksByAuthorId,
  insertAuthor,
  deleteAuthor
};
