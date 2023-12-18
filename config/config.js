const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "final_project1",
  password: "postgres",
  port: "5432",
});

module.exports = pool;
