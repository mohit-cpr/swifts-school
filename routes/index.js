var express = require("express");
var router = express.Router();
const pool = require("../config/config");
var adminRouter = require("./controller/admin");
var schoolRouter = require("./controller/school");
var classRouter = require("./controller/class");
var teacherRouter = require("./controller/teacher");
var { exportSql, shellScript, gitAdd, gitPush } = require("../utils/common");
// import adminRouter from "./controller/admin";

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/export", function(req, res, next) {
  exportSql();
  res.send("export successfull");
});

router.get("/run-script", function(req, res, next) {
  console.log(shellScript("pwd"));
});
/* GET home page. */
router.get("/test", function(req, res, next) {
  res.send("Hello world");
});

router.get("/git-add", function(req, res) {
  res.send(gitAdd(req.query.files));
});

router.get("/git-commit", function(req, res) {
  res.send(exportSql(req.query.message));
});

router.get("/git-push", function(req, res) {
  res.send(gitPush(req.query.origin));
});

router.get("/users", (request, response) => {
  pool.query("SELECT * FROM admin_login", (error, result) => {
    if (error) throw error;

    response.send(result);
  });
});

router.use("/admin", adminRouter);
router.use("/school", schoolRouter);
router.use("/class", classRouter);
router.use("/teacher", teacherRouter);

module.exports = router;
