const mysql = require("mysql");

const config = {
  host: "148.66.138.139",
  user: "swiftschool",
  password: "swiftschool",
  database: "swiftschool"
};

const pool = mysql.createPool(config);

module.exports = pool;
