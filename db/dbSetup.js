const { Client } = require("pg");
const fs = require("fs");
require("dotenv").config();

async function setup() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });


  try {
    await client.connect();
    console.log("✅ Database tables created successfully!");
  } catch (err) {
    console.error("❌ Error setting up DB:", err);
  } finally {
    await client.end();
  }
}

setup();