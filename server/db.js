const Pool = require("pg").Pool;

const pool = new Pool({
  user: "doadmin",
  password: process.env.REACT_APP_DB_PASS,
  host: "memory-game-db-do-user-12033416-0.b.db.ondigitalocean.com",
  port: 25060,
  database: "memoryGame",
  sslmode: "require",
});

module.exports = pool;
