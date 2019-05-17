var express = require("express");
var router = express.Router();
const pool = require("../config/config");
var adminRouter = require("./controller/admin");
var schoolRouter = require("./controller/school");
// import adminRouter from "./controller/admin";

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

router.use("/admin", adminRouter);
router.use("/school", schoolRouter);

module.exports = router;
