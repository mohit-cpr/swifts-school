const mysql = require("mysql");

const createDBCon = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password"
});

const config = {
  host: "localhost",
  user: "root",
  password: "password",
  database: "swiftsschool"
};

const exportConfig = {
  host: "localhost",
  user: "root",
  password: "password",
  database: "swiftsschool",
  dest: "./school.sql"
};

const pool = mysql.createPool(config);

module.exports = { pool, createDBCon, exportConfig };
