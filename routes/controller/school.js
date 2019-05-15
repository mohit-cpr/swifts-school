var express = require("express");
var router = express.Router();
const pool = require("../../config/config");

router.post("/add-school", (request, response) => {
  pool.query(
    `insert into school_details
    (school_name, school_address1, school_address2) values ('${request.body.name}','${
      request.body.password
    }','${request.body.role}')`,
    (error, result) => {
      if (error) throw error;

      if (result.affectedRows > 0) {
        response.send("Data inserted successfully");
      } else {
        response.send("Something went wrong... Try again");
      }
    }
  );
});

module.exports = router;
