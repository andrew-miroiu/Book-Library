require('dotenv').config(); // 🔥 adaugă asta sus
const { Client } = require('pg');

const SQL = `
CREATE TABLE IF NOT EXISTS usernames (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(255)
);

INSERT INTO usernames (username)
VALUES ('Bryan'), ('Odin'), ('Damon');
`;

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("❌ Missing DATABASE_URL in .env");
    process.exit(1);
  }
  console.log("DB URL:", connectionString);
  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("✅ Database seeded!");
}

main();
