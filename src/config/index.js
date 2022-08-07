// Import Library
const mysql2 = require("mysql2");

// Create Connection
const connection = mysql2.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Export Connection
module.exports = connection;
