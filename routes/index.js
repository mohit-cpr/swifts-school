var express = require("express");
var router = express.Router();
const pool = require("../config/config");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET home page. */
router.get("/test", function(req, res, next) {
  res.send("Hello world");
});

router.get("/users", (request, response) => {
  pool.query("SELECT * FROM admin_login", (error, result) => {
    if (error) throw error;

    response.send(result);
  });
});

router.post("/addAdmin", (request, response) => {
  pool.query(
    `insert into admin_login values ('${request.body.name}','${
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
