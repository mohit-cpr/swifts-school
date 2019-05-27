const mysql = require("mysql");

const createDBCon = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password"
});

const config = {
  host: "148.66.138.139",
  user: "swiftschool",
  password: "swiftschool",
  database: "swiftschool"
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
