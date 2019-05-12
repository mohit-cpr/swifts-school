var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET home page. */
router.get("/test", function(req, res, next) {
  res.send("Hello world");
});

module.exports = router;
