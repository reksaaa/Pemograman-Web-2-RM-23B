import pg from "pg";

const { Pool } = pg;

const db = new Pool({
  user: "admin",
  host: "localhost",
  database: "testing",
  password: "password",
  port: 5432,
});

export default db;
