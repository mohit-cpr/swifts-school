const mysql = require("mysql");

const config = {
  host: "localhost",
  user: "root",
  password: "password",
  database: "school"
};

const pool = mysql.createPool(config);

module.exports = pool;
