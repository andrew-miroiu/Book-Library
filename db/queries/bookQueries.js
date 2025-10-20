const pool = require("../pool");

// 🟢 Get all books
async function getAllBooks() {
  const { rows } = await pool.query(`
    SELECT 
      b.id,
      b.title,
      b.summary,
      a.name AS author,
      g.name AS genre
    FROM books b
    JOIN authors a ON b.author_id = a.id
    JOIN genres g ON b.genre_id = g.id
    ORDER BY b.title;
  `);
  return rows;
}

// 🟢 Get a single book by ID
async function getBookById(id) {
  const { rows } = await pool.query(
    `
    SELECT 
      b.id,
      b.title,
      b.summary,
      a.name AS author,
      g.name AS genre
    FROM books b
    JOIN authors a ON b.author_id = a.id
    JOIN genres g ON b.genre_id = g.id
    WHERE b.id = $1;
    `,
    [id]
  );
  return rows[0];
}

// 🟢 Insert new book
async function insertBook(title, author_id, genre_id, summary) {
  await pool.query(
    `
    INSERT INTO books (title, author_id, genre_id, summary)
    VALUES ($1, $2, $3, $4);
    `,
    [title, author_id, genre_id, summary]
  );
}

// 🟢 Delete a book by ID
async function deleteBookPost(id) {
  await pool.query(
    `DELETE FROM books WHERE id = $1;`,
    [id]
  );
}

async function getRandomBooks(limit = 5) {
  const result = await pool.query(`
    SELECT 
      b.id,
      b.title,
      b.summary,
      a.name AS author,
      g.name AS genre
    FROM books b
    JOIN authors a ON b.author_id = a.id
    JOIN genres g ON b.genre_id = g.id
    ORDER BY RANDOM()
    LIMIT $1
  `, [limit]);
  return result.rows;
}

module.exports = {
  getAllBooks,
  getBookById,
  insertBook,
  deleteBookPost,
  getRandomBooks
};
