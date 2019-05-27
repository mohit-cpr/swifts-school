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
  database: "school"
};

const exportConfig = {
  host: "localhost",
  user: "root",
  password: "password",
  database: "swiftsschool",
  dest: "./test.sql"
};

const pool = mysql.createPool(config);

module.exports = { pool, createDBCon, exportConfig };
