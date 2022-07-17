const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "postPass",
    host: "localhost",
    port: 5432,
    database: "memorygame"
});

module.exports = pool;