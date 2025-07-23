const { Pool } = require("pg");

module.exports = new Pool({
  host: "localhost",
  user: `${process.env.PSQL_USER}`,
  database: "store_inventory",
  password: `${encodeURIComponent(process.env.PSQL_PASS)}`,
  port: 5432,
});
